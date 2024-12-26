export const RegistryAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum Registry.UserType",
        "name": "userType",
        "type": "uint8"
      }
    ],
    "name": "UserRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "companionAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "companions",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "birthday",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "icon",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "introduction",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rating",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "orderNum",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "pricePerOrder",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllCompanions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birthday",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "icon",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "introduction",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "rating",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "orderNum",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pricePerOrder",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          }
        ],
        "internalType": "struct Registry.Companion[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getCompanion",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birthday",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "icon",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "introduction",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "rating",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "orderNum",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pricePerOrder",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          }
        ],
        "internalType": "struct Registry.Companion",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getRegularUser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "birthday",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "icon",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "introduction",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "rating",
            "type": "uint256"
          }
        ],
        "internalType": "struct Registry.User",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_birthDay",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_icon",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_introduction",
        "type": "string"
      },
      {
        "internalType": "enum Registry.UserType",
        "name": "_userType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_pricePerOrder",
        "type": "uint256"
      }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "regularUsers",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "birthday",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "icon",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "introduction",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rating",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_chaperonAddr",
        "type": "address"
      }
    ],
    "name": "updateOrders",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newRate",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_chaperonAddr",
        "type": "address"
      }
    ],
    "name": "updateRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userTypes",
    "outputs": [
      {
        "internalType": "enum Registry.UserType",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const