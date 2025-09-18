module lms_platform::course_payments {
    use std::signer;
    use std::vector;
    use std::string::{Self, String};
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::timestamp;
    use aptos_framework::account;

    /// Error codes
    const E_NOT_AUTHORIZED: u64 = 1;
    const E_COURSE_NOT_FOUND: u64 = 2;
    const E_ALREADY_ENROLLED: u64 = 3;
    const E_INSUFFICIENT_PAYMENT: u64 = 4;
    const E_COURSE_NOT_PUBLISHED: u64 = 5;
    const E_COURSE_NOT_COMPLETED: u64 = 6;
    const E_INVALID_RATING: u64 = 7;
    const E_ALREADY_REVIEWED: u64 = 8;

    /// Course status
    const COURSE_DRAFT: u8 = 0;
    const COURSE_PUBLISHED: u8 = 1;
    const COURSE_ARCHIVED: u8 = 2;

    /// Course structure
    struct Course has key, store {
        id: u64,
        title: String,
        description: String,
        instructor: address,
        price: u64, // Price in APT (smallest unit)
        status: u8,
        created_at: u64,
        updated_at: u64,
        total_lessons: u64,
        enrolled_students: u64,
        rating_sum: u64,
        rating_count: u64,
        category: String,
        difficulty_level: u8, // 1-5 (Beginner to Expert)
        average_rating: u64, // New field for average rating
    }

    /// Enrollment record
    struct Enrollment has key, store {
        student: address,
        course_id: u64,
        enrolled_at: u64,
        progress: u64, // Percentage completed (0-100)
        completed: bool,
        completion_date: u64,
        lessons_completed: vector<u64>,
        time_spent: u64, // In seconds
    }

    /// Review structure
    struct Review has key, store {
        student: address,
        course_id: u64,
        rating: u64, // 1-5 stars
        comment: String,
        created_at: u64,
    }

    /// Certificate structure
    struct Certificate has key, store {
        student: address,
        course_id: u64,
        issued_at: u64,
        certificate_hash: String,
    }

    /// Platform data structure
    struct Platform has key {
        courses: vector<Course>,
        reviews: vector<Review>,
        certificates: vector<Certificate>,
        next_course_id: u64,
        platform_fee_percentage: u64, // Platform fee as percentage (e.g., 5 = 5%)
        platform_owner: address,
        total_revenue: u64,
        total_courses: u64,
        total_students: u64,
        featured_courses: vector<u64>,
    }

    /// Student enrollments
    struct StudentEnrollments has key {
        enrollments: vector<Enrollment>,
    }

    /// Instructor profile
    struct InstructorProfile has key {
        instructor: address,
        courses_created: vector<u64>,
        total_earnings: u64,
        rating_sum: u64,
        rating_count: u64,
        bio: String,
        expertise: vector<String>,
    }

    /// Initialize the platform
    public entry fun initialize_platform(
        account: &signer,
        platform_fee_percentage: u64
    ) {
        let platform_owner = signer::address_of(account);
        
        move_to(account, Platform {
            courses: vector::empty<Course>(),
            reviews: vector::empty<Review>(),
            certificates: vector::empty<Certificate>(),
            next_course_id: 1,
            platform_fee_percentage,
            platform_owner,
            total_revenue: 0,
            total_courses: 0,
            total_students: 0,
            featured_courses: vector::empty<u64>(),
        });
    }

    /// Create instructor profile
    public entry fun create_instructor_profile(
        instructor: &signer,
        bio: String,
        expertise: vector<String>
    ) {
        let instructor_addr = signer::address_of(instructor);
        
        move_to(instructor, InstructorProfile {
            instructor: instructor_addr,
            courses_created: vector::empty<u64>(),
            total_earnings: 0,
            rating_sum: 0,
            rating_count: 0,
            bio,
            expertise,
        });
    }

    /// Create a new course with enhanced details
    public entry fun create_course(
        instructor: &signer,
        title: String,
        description: String,
        price: u64,
        total_lessons: u64,
        category: String,
        difficulty_level: u8
    ) acquires Platform, InstructorProfile {
        let instructor_addr = signer::address_of(instructor);
        let platform = borrow_global_mut<Platform>(@lms_platform);
        
        let course = Course {
            id: platform.next_course_id,
            title,
            description,
            instructor: instructor_addr,
            price,
            status: COURSE_DRAFT,
            created_at: timestamp::now_seconds(),
            updated_at: timestamp::now_seconds(),
            total_lessons,
            enrolled_students: 0,
            rating_sum: 0,
            rating_count: 0,
            category,
            difficulty_level,
            average_rating: 0, // Initialize average rating
        };

        vector::push_back(&mut platform.courses, course);
        platform.next_course_id = platform.next_course_id + 1;
        platform.total_courses = platform.total_courses + 1;

        // Update instructor profile
        if (exists<InstructorProfile>(instructor_addr)) {
            let profile = borrow_global_mut<InstructorProfile>(instructor_addr);
            vector::push_back(&mut profile.courses_created, platform.next_course_id - 1);
        };
    }

    /// Publish a course (make it available for enrollment)
    public entry fun publish_course(
        instructor: &signer,
        course_id: u64
    ) acquires Platform {
        let instructor_addr = signer::address_of(instructor);
        let platform = borrow_global_mut<Platform>(@lms_platform);
        
        let course_ref = get_course_mut(&mut platform.courses, course_id);
        assert!(course_ref.instructor == instructor_addr, E_NOT_AUTHORIZED);
        
        course_ref.status = COURSE_PUBLISHED;
        course_ref.updated_at = timestamp::now_seconds();
    }

    /// Enroll in a course with APT payment
    public entry fun enroll_in_course(
        student: &signer,
        course_id: u64,
        platform_addr: address
    ) acquires Platform, StudentEnrollments {
        let student_addr = signer::address_of(student);
        let platform = borrow_global_mut<Platform>(platform_addr);
        
        let course_ref = get_course_mut(&mut platform.courses, course_id);
        assert!(course_ref.status == COURSE_PUBLISHED, E_COURSE_NOT_PUBLISHED);
        
        // Check if student is already enrolled
        if (exists<StudentEnrollments>(student_addr)) {
            let enrollments = borrow_global<StudentEnrollments>(student_addr);
            assert!(!is_already_enrolled(&enrollments.enrollments, course_id), E_ALREADY_ENROLLED);
        };

        // Process payment
        let course_price = course_ref.price;
        let platform_fee = (course_price * platform.platform_fee_percentage) / 100;
        let instructor_payment = course_price - platform_fee;

        // Transfer APT from student to instructor
        coin::transfer<AptosCoin>(student, course_ref.instructor, instructor_payment);
        
        // Transfer platform fee to platform owner
        if (platform_fee > 0) {
            coin::transfer<AptosCoin>(student, platform.platform_owner, platform_fee);
        };

        // Update platform revenue
        platform.total_revenue = platform.total_revenue + course_price;

        // Create enrollment record
        let enrollment = Enrollment {
            student: student_addr,
            course_id,
            enrolled_at: timestamp::now_seconds(),
            progress: 0,
            completed: false,
            completion_date: 0,
            lessons_completed: vector::empty<u64>(),
            time_spent: 0,
        };

        // Add to student's enrollments
        if (!exists<StudentEnrollments>(student_addr)) {
            move_to(student, StudentEnrollments {
                enrollments: vector::empty<Enrollment>(),
            });
            platform.total_students = platform.total_students + 1;
        };

        let student_enrollments = borrow_global_mut<StudentEnrollments>(student_addr);
        vector::push_back(&mut student_enrollments.enrollments, enrollment);

        // Update course enrolled students count
        course_ref.enrolled_students = course_ref.enrolled_students + 1;
    }

    /// Function to enroll a user in a course
    public fun enroll_user(course_id: u64, user: signer) {
        // Check if the user is authorized
        if (!is_authorized(user)) {
            abort(E_NOT_AUTHORIZED);
        }

        // Check if the course exists
        if (!course_exists(course_id)) {
            abort(E_COURSE_NOT_FOUND);
        }

        // Check if the user is already enrolled
        if (is_enrolled(course_id, user)) {
            abort(E_ALREADY_ENROLLED);
        }

        // Enroll the user
        // ...existing code...
    }

    /// Check if a user is enrolled in a course
    public fun is_enrolled(course_id: u64, user: signer): bool {
        // Logic to check enrollment
        // ...existing code...
    }

    /// Get the price of a course
    public fun get_course_price(course_id: u64): u64 {
        // Logic to retrieve course price
        // ...existing code...
    }

    /// Enroll a user in a course
    public fun enroll(course_id: u64, user: signer) {
        // Logic to enroll user
        // ...existing code...
    }

    /// Mark lesson as completed
    public entry fun complete_lesson(
        student: &signer,
        course_id: u64,
        lesson_id: u64
    ) acquires StudentEnrollments {
        let student_addr = signer::address_of(student);
        assert!(exists<StudentEnrollments>(student_addr), E_NOT_AUTHORIZED);
        
        let enrollments = borrow_global_mut<StudentEnrollments>(student_addr);
        let enrollment_ref = get_enrollment_mut(&mut enrollments.enrollments, course_id);
        
        // Add lesson to completed lessons if not already completed
        if (!vector::contains(&enrollment_ref.lessons_completed, &lesson_id)) {
            vector::push_back(&mut enrollment_ref.lessons_completed, lesson_id);
        };
    }

    /// Update course progress
    public entry fun update_progress(
        student: &signer,
        course_id: u64,
        new_progress: u64,
        time_spent: u64
    ) acquires StudentEnrollments, Platform {
        let student_addr = signer::address_of(student);
        assert!(exists<StudentEnrollments>(student_addr), E_NOT_AUTHORIZED);
        
        let enrollments = borrow_global_mut<StudentEnrollments>(student_addr);
        let enrollment_ref = get_enrollment_mut(&mut enrollments.enrollments, course_id);
        
        enrollment_ref.progress = new_progress;
        enrollment_ref.time_spent = enrollment_ref.time_spent + time_spent;
        
        // Mark as completed if progress is 100%
        if (new_progress >= 100 && !enrollment_ref.completed) {
            enrollment_ref.completed = true;
            enrollment_ref.completion_date = timestamp::now_seconds();
            
            // Issue certificate
            issue_certificate_internal(student_addr, course_id);
        };
    }

    /// Add course review and rating
    public entry fun add_review(
        student: &signer,
        course_id: u64,
        rating: u64,
        comment: String,
        platform_addr: address
    ) acquires StudentEnrollments, Platform {
        let student_addr = signer::address_of(student);
        assert!(rating >= 1 && rating <= 5, E_INVALID_RATING);
        
        // Check if student is enrolled and completed the course
        assert!(exists<StudentEnrollments>(student_addr), E_NOT_AUTHORIZED);
        let enrollments = borrow_global<StudentEnrollments>(student_addr);
        let enrollment = get_enrollment(&enrollments.enrollments, course_id);
        assert!(enrollment.completed, E_COURSE_NOT_COMPLETED);
        
        let platform = borrow_global_mut<Platform>(platform_addr);
        
        // Check if already reviewed
        assert!(!has_reviewed(student_addr, course_id, &platform.reviews), E_ALREADY_REVIEWED);
        
        // Create review
        let review = Review {
            student: student_addr,
            course_id,
            rating,
            comment,
            created_at: timestamp::now_seconds(),
        };
        
        vector::push_back(&mut platform.reviews, review);
        
        // Update course rating
        let course_ref = get_course_mut(&mut platform.courses, course_id);
        course_ref.rating_sum = course_ref.rating_sum + rating;
        course_ref.rating_count = course_ref.rating_count + 1;

        // Calculate new average rating
        course_ref.average_rating = course_ref.rating_sum / course_ref.rating_count;
        // Emit event for review creation
        emit_review_created_event(student_addr, course_id, rating, comment);
    }

    /// Issue certificate (internal function)
    fun issue_certificate_internal(
        student_addr: address,
        course_id: u64
    ) acquires Platform {
        let platform = borrow_global_mut<Platform>(@lms_platform);
        
        let certificate_hash = generate_certificate_hash(student_addr, course_id);
        
        let certificate = Certificate {
            student: student_addr,
            course_id,
            issued_at: timestamp::now_seconds(),
            certificate_hash,
        };
        
        vector::push_back(&mut platform.certificates, certificate);
    }

    /// Generate certificate hash (simplified)
    fun generate_certificate_hash(student_addr: address, course_id: u64): String {
        // In a real implementation, this would generate a proper hash
        let hash_str = string::utf8(b"CERT_");
        string::append(&mut hash_str, string::utf8(b"STUDENT_"));
        string::append(&mut hash_str, string::utf8(b"COURSE_"));
        hash_str
    }

    /// Add course to featured list
    public entry fun add_to_featured(
        platform_owner: &signer,
        course_id: u64
    ) acquires Platform {
        let owner_addr = signer::address_of(platform_owner);
        let platform = borrow_global_mut<Platform>(@lms_platform);
        assert!(platform.platform_owner == owner_addr, E_NOT_AUTHORIZED);
        
        if (!vector::contains(&platform.featured_courses, &course_id)) {
            vector::push_back(&mut platform.featured_courses, course_id);
        };
    }

    /// Helper function to get course by ID
    fun get_course_mut(courses: &mut vector<Course>, course_id: u64): &mut Course {
        let i = 0;
        let len = vector::length(courses);
        while (i < len) {
            let course = vector::borrow_mut(courses, i);
            if (course.id == course_id) {
                return course
            };
            i = i + 1;
        };
        abort E_COURSE_NOT_FOUND
    }

    /// Helper function to get enrollment by course ID
    fun get_enrollment_mut(enrollments: &mut vector<Enrollment>, course_id: u64): &mut Enrollment {
        let i = 0;
        let len = vector::length(enrollments);
        while (i < len) {
            let enrollment = vector::borrow_mut(enrollments, i);
            if (enrollment.course_id == course_id) {
                return enrollment
            };
            i = i + 1;
        };
        abort E_COURSE_NOT_FOUND
    }

    /// Helper function to get enrollment by course ID (read-only)
    fun get_enrollment(enrollments: &vector<Enrollment>, course_id: u64): &Enrollment {
        let i = 0;
        let len = vector::length(enrollments);
        while (i < len) {
            let enrollment = vector::borrow(enrollments, i);
            if (enrollment.course_id == course_id) {
                return enrollment
            };
            i = i + 1;
        };
        abort E_COURSE_NOT_FOUND
    }

    /// Helper function to check if student is already enrolled
    fun is_already_enrolled(enrollments: &vector<Enrollment>, course_id: u64): bool {
        let i = 0;
        let len = vector::length(enrollments);
        while (i < len) {
            let enrollment = vector::borrow(enrollments, i);
            if (enrollment.course_id == course_id) {
                return true
            };
            i = i + 1;
        };
        false
    }

    /// Helper function to check if student has already reviewed
    fun has_reviewed(student_addr: address, course_id: u64, reviews: &vector<Review>): bool {
        let i = 0;
        let len = vector::length(reviews);
        while (i < len) {
            let review = vector::borrow(reviews, i);
            if (review.student == student_addr && review.course_id == course_id) {
                return true
            };
            i = i + 1;
        };
        false
    }

    /// View functions for frontend integration

    #[view]
    public fun get_course_details(platform_addr: address, course_id: u64): (String, String, address, u64, u8, u64, u64, u64, u64, String, u8) acquires Platform {
        let platform = borrow_global<Platform>(platform_addr);
        let course = get_course(&platform.courses, course_id);
        let avg_rating = if (course.rating_count > 0) {
            course.rating_sum / course.rating_count
        } else {
            0
        };
        (course.title, course.description, course.instructor, course.price, course.status, course.total_lessons, course.enrolled_students, avg_rating, course.rating_count, course.category, course.difficulty_level)
    }

    #[view]
    public fun get_student_enrollments(student_addr: address): vector<u64> acquires StudentEnrollments {
        if (!exists<StudentEnrollments>(student_addr)) {
            return vector::empty<u64>()
        };
        
        let enrollments = borrow_global<StudentEnrollments>(student_addr);
        let course_ids = vector::empty<u64>();
        let i = 0;
        let len = vector::length(&enrollments.enrollments);
        
        while (i < len) {
            let enrollment = vector::borrow(&enrollments.enrollments, i);
            vector::push_back(&mut course_ids, enrollment.course_id);
            i = i + 1;
        };
        
        course_ids
    }

    #[view]
    public fun get_platform_stats(platform_addr: address): (u64, u64, u64, u64) acquires Platform {
        let platform = borrow_global<Platform>(platform_addr);
        (platform.total_courses, platform.total_students, platform.total_revenue, vector::length(&platform.featured_courses))
    }

    #[view]
    public fun get_featured_courses(platform_addr: address): vector<u64> acquires Platform {
        let platform = borrow_global<Platform>(platform_addr);
        platform.featured_courses
    }

    #[view]
    public fun get_student_certificates(student_addr: address, platform_addr: address): vector<u64> acquires Platform {
        let platform = borrow_global<Platform>(platform_addr);
        let course_ids = vector::empty<u64>();
        let i = 0;
        let len = vector::length(&platform.certificates);
        
        while (i < len) {
            let certificate = vector::borrow(&platform.certificates, i);
            if (certificate.student == student_addr) {
                vector::push_back(&mut course_ids, certificate.course_id);
            };
            i = i + 1;
        };
        
        course_ids
    }

    /// Helper function to get course by ID (read-only)
    fun get_course(courses: &vector<Course>, course_id: u64): &Course {
        let i = 0;
        let len = vector::length(courses);
        while (i < len) {
            let course = vector::borrow(courses, i);
            if (course.id == course_id) {
                return course
            };
            i = i + 1;
        };
        abort E_COURSE_NOT_FOUND
    }
}