'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, BookOpen, Zap, Star, Crown } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "",
      description: "Perfect for getting started",
      features: [
        "Access to free courses",
        "Basic course builder",
        "Community support",
        "Standard video quality",
        "Limited storage (1GB)"
      ],
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      price: "29.99",
      period: "/month",
      description: "For serious learners and creators",
      features: [
        "All free features",
        "Access to premium courses",
        "Advanced course builder",
        "Priority support",
        "HD video quality",
        "10GB storage",
        "Analytics dashboard",
        "Custom branding"
      ],
      popular: true,
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "99.99",
      period: "/month",
      description: "For organizations and teams",
      features: [
        "All Pro features",
        "Unlimited storage",
        "White-label solution",
        "API access",
        "Dedicated support",
        "Advanced analytics",
        "Team management",
        "Custom integrations",
        "SLA guarantee"
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NoCode LMS</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/courses" className="text-gray-500 hover:text-gray-900">Courses</Link>
              <Link href="/builder" className="text-gray-500 hover:text-gray-900">Course Builder</Link>
              <Link href="/pricing" className="text-indigo-600 font-medium">Pricing</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start for free, then upgrade to unlock more features. 
            All plans include access to our Aptos payment system.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-indigo-600 shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-indigo-600 text-white px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                  {plan.name === 'Enterprise' && <Crown className="h-5 w-5 inline ml-2 text-yellow-500" />}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price === 'Free' ? plan.price : `$${plan.price}`}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 text-lg">{plan.period}</span>
                  )}
                </div>
                <CardDescription className="text-base mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold">Basic</th>
                  <th className="text-center py-4 px-4 font-semibold">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4">Course Creation</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Aptos Payments</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Storage</td>
                  <td className="text-center py-4 px-4">1GB</td>
                  <td className="text-center py-4 px-4">10GB</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Analytics</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4">Advanced</td>
                  <td className="text-center py-4 px-4">Enterprise</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Support</td>
                  <td className="text-center py-4 px-4">Community</td>
                  <td className="text-center py-4 px-4">Priority</td>
                  <td className="text-center py-4 px-4">Dedicated</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Custom Branding</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">API Access</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">We accept APT tokens through the Aptos blockchain, as well as traditional payment methods like credit cards.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">Yes! The Pro plan comes with a 14-day free trial. No credit card required to start.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm">We offer a 30-day money-back guarantee for all paid plans. No questions asked.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I use my own domain?</h3>
              <p className="text-gray-600 text-sm">Yes, custom domains are available with Pro and Enterprise plans.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is there customer support?</h3>
              <p className="text-gray-600 text-sm">All plans include support. Basic has community support, Pro has priority email support, and Enterprise has dedicated support.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of educators and students using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}