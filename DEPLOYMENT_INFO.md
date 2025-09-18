# Aptos LMS Platform Deployment Guide

## Account Information
- **Account Address**: `0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e`
- **Network**: Devnet
- **Private Key**: `ed25519-priv-0x0af9c48572bfbafb743c7657d0e75e050cc695c595d3b0f1af54ce7cd90d8526`
- **Public Key**: `ed25519-pub-0x11b9427b762519b566823729b0f6b71fc3c1fb062acf036a48e325e7c649816f`

## Contract Information
- **Module Name**: `course_payments`
- **Contract Address**: `0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e::course_payments`
- **Transaction Hash**: `0xf132befb1dbf2cad7ed33491e7c6ae4b652ad93cbfe108e04e9bd4059c123cf3`
- **Explorer URL**: https://explorer.aptoslabs.com/txn/0xf132befb1dbf2cad7ed33491e7c6ae4b652ad93cbfe108e04e9bd4059c123cf3?network=devnet

## Network Configuration
- **REST URL**: `https://fullnode.devnet.aptoslabs.com`
- **Faucet URL**: `https://faucet.devnet.aptoslabs.com`

## Available Functions
1. `initialize_platform(admin: &signer)`
2. `create_course(instructor: &signer, title: String, description: String, price: u64)`
3. `publish_course(instructor: &signer, course_id: u64)`
4. `enroll_in_course(student: &signer, instructor_addr: address, course_id: u64)`

## Usage Examples

### Initialize Platform
```bash
aptos move run --function-id 0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e::course_payments::initialize_platform
```

### Create Course
```bash
aptos move run --function-id 0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e::course_payments::create_course --args string:"Course Title" string:"Course Description" u64:1000000
```

### Publish Course
```bash
aptos move run --function-id 0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e::course_payments::publish_course --args u64:1
```

### Enroll in Course
```bash
aptos move run --function-id 0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e::course_payments::enroll_in_course --args address:0x9e1ce87a71fcfe3322e03bf7e87243ad1052ff6f6b0b08981efc55ebff0a581e u64:1
```

## File Structure
```
.aptos/
└── config.yaml          # Aptos CLI configuration
Move.toml                 # Move package configuration
sources/
└── NocodeLMSbuilderwithAPTOS.move  # Smart contract source
```

## Notes
- The account has been funded with 100,000,000 Octas (1 APT) for testing
- Contract successfully compiled and deployed to devnet
- All functions are ready for frontend integration