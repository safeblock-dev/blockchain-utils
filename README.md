
# @safeblock/blockchain-utils

_The documentation is outdated and will be updated as soon as possible_

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Network Management](#network-management)
  - [Address Utilities](#address-utilities)
  - [Amount Utilities](#amount-utilities)
  - [Ethers Provider](#ethers-provider)
- [API Reference](#api-reference)
  - [Core Modules](#core-modules)
  - [Utilities](#utilities)
  - [Address Management](#address-management)
  - [Amount Utilities](#amount-utilities)
  - [Ethers Provider](#ethers-provider)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

`@safeblock/blockchain-utils` provides tools and utilities for managing blockchain networks, addresses, amounts, and providers with seamless integration and ease of use. Built for developers working in blockchain ecosystems, it includes functionalities to manage networks, validate and process addresses, handle amounts effectively, and utilize fallback providers.

---

## Features

- **Network Management:** Pre-configured support for blockchain networks.
- **Address Utilities:** Includes type checks, actions, and support for special addresses.
- **Amount Utilities:** Provides robust tools for amount calculations, formatting, and validation.
- **Provider Integration:** Simplifies interactions with public nodes using a fallback mechanism.
- **Provider Reconfiguration:** Dynamically update the provider list as needed.
- **Extensible:** Modular design for easy customization and integration.

---

## Installation

Install the package via npm:

```bash
npm install @safeblock/blockchain-utils
```

or via yarn:

```bash
yarn add @safeblock/blockchain-utils
```

---

## Usage

### Network Management

```typescript
import { networks } from '@safeblock/blockchain-utils';

console.log(networks);
```

### Address Utilities

```typescript
import { isSpecialAddress, validateAddress } from '@safeblock/blockchain-utils/address';

const address = '0x...';

// Check if an address is special
console.log(isSpecialAddress(address));

// Validate the address format
console.log(validateAddress(address));
```

The Address Utilities module also supports:
- **Address Type Checks:** Easily determine if an address is valid or matches specific criteria.
- **Address Actions:** Includes functions for address formatting and manipulation.

### Amount Utilities

```typescript
import { parseAmount, formatAmount } from '@safeblock/blockchain-utils/amount';

// Parse an amount string to a standardized object
const parsedAmount = parseAmount('1.23');
console.log(parsedAmount);

// Format an amount object for display
const formattedAmount = formatAmount(parsedAmount);
console.log(formattedAmount);
```

The Amount Utilities module supports:
- Parsing amounts from strings into objects.
- Formatting amounts for user-friendly display.
- Validating amounts to ensure accuracy.

### Ethers Provider

```typescript
import { createFallbackProvider, reconfigureProviders } from '@safeblock/blockchain-utils/ethers-provider';

// Create a fallback provider with a list of nodes
const provider = createFallbackProvider(['https://mainnet.infura.io', 'https://cloudflare-eth.com']);

// Dynamically update the provider list
reconfigureProviders(provider, ['https://new-node1.com', 'https://new-node2.com']);
```

The Ethers Provider module supports:
- Fallback mechanisms for reliable provider access.
- Reconfiguring provider lists dynamically without restarting the application.

---

## API Reference

### Core Modules

- `networks`: Pre-defined blockchain network configurations.
- `index`: Main entry point to the package.

### Utilities

- `selectAddress`: Helps select and validate blockchain addresses.
- `cast`: Handles type conversions.

### Address Management

- `specialAddresses`: Defines special address types and checks.
- `addressActions`: Perform actions such as validations and formatting.

### Amount Utilities

- `parseAmount`: Converts string representations of amounts into structured objects.
- `formatAmount`: Formats structured amounts for user-friendly display.

### Ethers Provider

- `publicNodesList`: Lists pre-configured public nodes for network access.
- `createFallbackProvider`: Ensures reliable provider access by using fallback mechanisms.
- `reconfigureProviders`: Dynamically updates the provider list for runtime flexibility.

---

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push the changes: `git push origin feature-branch-name`.
5. Submit a pull request.

---

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.  
For more information, visit: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

---
