window.STACK_DATA = {
  "vars": {
    "title": "Example 1 \u2014 variables",
    "subtitle": "int a = 7; int b = 3;",
    "source": [
      "int main(void)",
      "{",
      "    int a = 7;",
      "    int b = 3;",
      "    return a + b;",
      "}"
    ],
    "asm": [
      [
        "08049152",
        "push",
        "ebp"
      ],
      [
        "08049153",
        "mov",
        "ebp, esp"
      ],
      [
        "08049155",
        "sub",
        "esp, 0x8"
      ],
      [
        "08049158",
        "mov",
        "DWORD PTR [ebp-0x4], 0x7",
        "; a = 7"
      ],
      [
        "0804915f",
        "mov",
        "DWORD PTR [ebp-0x8], 0x3",
        "; b = 3"
      ],
      [
        "08049166",
        "mov",
        "edx, DWORD PTR [ebp-0x4]",
        "; read a"
      ],
      [
        "08049169",
        "mov",
        "eax, DWORD PTR [ebp-0x8]",
        "; read b"
      ],
      [
        "0804916c",
        "add",
        "eax, edx",
        "; a + b"
      ],
      [
        "0804916e",
        "leave",
        "",
        "; destroy frame"
      ],
      [
        "0804916f",
        "ret",
        "",
        "; return to caller"
      ]
    ],
    "steps": [
      {
        "label": "vars: after main prologue, before a=7",
        "cLine": 3,
        "asmLine": 2,
        "frame": "vars",
        "note": "The prologue has run: push ebp; mov ebp,esp; sub esp,8. EBP now marks the base of main's frame, and ESP has moved down by 8 bytes to make room for a and b. Nothing has written 7 or 3 yet.",
        "espLabels": {},
        "eip": "0x08049158",
        "esp": "0xffffdc40",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": null,
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517179
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851469
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 4160471040
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491bb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc04918d\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000000\t0x00000000\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc40:\t0xf7fbc000\t0xf7fbc000\t0x00000000\t0xf7df5e46",
          "0xffffdc50:\t0x00000001\t0xffffdcf4"
        ],
        "extra": [
          "GDB: addresses of the local variables",
          "$1 = 0xffffdc44",
          "$2 = 0xffffdc40"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "vars: after a=7 has been stored",
        "cLine": 3,
        "asmLine": 3,
        "frame": "vars",
        "note": "mov DWORD PTR [ebp-4],7 writes the 4-byte integer 7 at address EBP-4. GDB confirms &a = 0xffffdc44 = EBP-4. ESP does not change: storing a local variable is a memory write, not a push.",
        "espLabels": {},
        "eip": "0x0804915f",
        "esp": "0xffffdc40",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": null,
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517179
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851469
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491bb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc04918d\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000000\t0x00000000\t0xf7fbc000\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc40:\t0xf7fbc000\t0x00000007\t0x00000000\t0xf7df5e46",
          "0xffffdc50:\t0x00000001\t0xffffdcf4"
        ],
        "extra": [
          "$3 = 7",
          "$4 = 0xffffdc44"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "vars: after b=3 has been stored",
        "cLine": 4,
        "asmLine": 4,
        "frame": "vars",
        "note": "b is stored at EBP-8. The GDB byte dump x/8bx &b shows 03 00 00 00 07 00 00 00: first b=3, then a=7 at the next higher address. On x86 this is little-endian: the least significant byte comes first.",
        "espLabels": {},
        "eip": "0x08049166",
        "esp": "0xffffdc40",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": null,
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517179
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851469
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491bb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc04918d\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000000\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc40:\t0x00000003\t0x00000007\t0x00000000\t0xf7df5e46",
          "0xffffdc50:\t0x00000001\t0xffffdcf4"
        ],
        "extra": [
          "$5 = 7",
          "$6 = 3",
          "$7 = 0xffffdc44",
          "$8 = 0xffffdc40",
          "GDB: bytes at &b (b first, then a at the next higher address)",
          "0xffffdc40:\t0x03\t0x00\t0x00\t0x00\t0x07\t0x00\t0x00\t0x00"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "vars: at leave, before returning a+b",
        "cLine": 5,
        "asmLine": 8,
        "frame": "vars",
        "note": "The two loads and add have produced 10 in EAX. leave will set ESP=EBP, pop the saved EBP, and ret will pop the saved EIP. The locals are not explicitly erased; they simply stop being part of the active frame.",
        "espLabels": {},
        "eip": "0x0804916e",
        "esp": "0xffffdc40",
        "ebp": "0xffffdc48",
        "eax": "0x0000000a",
        "edx": null,
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517179
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851469
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491bb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc04918d\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000000\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc40:\t0x00000003\t0x00000007\t0x00000000\t0xf7df5e46",
          "0xffffdc50:\t0x00000001\t0xffffdcf4"
        ],
        "extra": [
          "$9 = 7",
          "$10 = 3",
          "$11 = 0xffffdc44",
          "$12 = 0xffffdc40",
          "[Inferior 1 (process 2091) exited with code 012]"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      }
    ]
  },
  "call": {
    "title": "Example 2 \u2014 calling a method",
    "subtitle": "int result = add(a, b);",
    "source": [
      "int add(int x, int y)",
      "{",
      "    int sum = x + y;",
      "    return sum;",
      "}",
      "",
      "int main(void)",
      "{",
      "    int a = 7;",
      "    int b = 3;",
      "    int result = add(a, b);",
      "    return result;",
      "}"
    ],
    "asm": [
      [
        "08049152",
        "push",
        "ebp",
        "; add() prologue"
      ],
      [
        "08049153",
        "mov",
        "ebp, esp"
      ],
      [
        "08049155",
        "sub",
        "esp, 0x4"
      ],
      [
        "08049158",
        "mov",
        "edx, DWORD PTR [ebp+0x8]",
        "; x"
      ],
      [
        "0804915b",
        "mov",
        "eax, DWORD PTR [ebp+0xc]",
        "; y"
      ],
      [
        "0804915e",
        "add",
        "eax, edx",
        "; x+y"
      ],
      [
        "08049160",
        "mov",
        "DWORD PTR [ebp-0x4], eax",
        "; sum"
      ],
      [
        "08049163",
        "mov",
        "eax, DWORD PTR [ebp-0x4]",
        "; return value"
      ],
      [
        "08049166",
        "leave",
        "",
        "; destroy add's frame"
      ],
      [
        "08049167",
        "ret",
        "",
        "; return to main"
      ],
      [
        "08049168",
        "push",
        "ebp",
        "; main() prologue"
      ],
      [
        "08049169",
        "mov",
        "ebp, esp"
      ],
      [
        "0804916b",
        "sub",
        "esp, 0xc"
      ],
      [
        "0804916e",
        "mov",
        "DWORD PTR [ebp-0x4], 0x7",
        "; a = 7"
      ],
      [
        "08049175",
        "mov",
        "DWORD PTR [ebp-0x8], 0x3",
        "; b = 3"
      ],
      [
        "0804917c",
        "push",
        "DWORD PTR [ebp-0x8]",
        "; push b first"
      ],
      [
        "0804917f",
        "push",
        "DWORD PTR [ebp-0x4]",
        "; push a second"
      ],
      [
        "08049182",
        "call",
        "8049152 <add>",
        "; push return address + jump"
      ],
      [
        "08049187",
        "add",
        "esp, 0x8",
        "; caller cleans arguments"
      ],
      [
        "0804918a",
        "mov",
        "DWORD PTR [ebp-0xc], eax",
        "; result = return value"
      ],
      [
        "0804918d",
        "mov",
        "eax, DWORD PTR [ebp-0xc]",
        "; load result for return"
      ],
      [
        "08049190",
        "leave",
        "",
        ""
      ],
      [
        "08049191",
        "ret",
        "",
        ""
      ]
    ],
    "steps": [
      {
        "label": "call: main after prologue, before a=7",
        "cLine": 9,
        "asmLine": 12,
        "frame": "call_main",
        "note": "main's prologue allocated 12 bytes with sub esp,0xc. EBP is the frame base; ESP is the current top. The local slots for a, b and result exist at EBP-4, EBP-8 and EBP-12 but are not initialized yet.",
        "espLabels": {},
        "eip": "0x0804916e",
        "esp": "0xffffdc3c",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517227
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851517
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 4160471040
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491bd\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000000\t0x00000000\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc3c:\t0x00000000\t0xf7fbc000\t0xf7fbc000\t0x00000000",
          "0xffffdc4c:\t0xf7df5e46\t0x00000001"
        ],
        "extra": [
          "$1 = 0xffffdc44",
          "$2 = 0xffffdc40",
          "$3 = 0xffffdc3c"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "call: main after a=7 has been stored",
        "cLine": 9,
        "asmLine": 13,
        "frame": "call_main",
        "note": "a=7 is written to EBP-4. GDB's p/x &a prints 0xffffdc44, exactly EBP-4 because EBP is 0xffffdc48.",
        "espLabels": {},
        "eip": "0x08049175",
        "esp": "0xffffdc3c",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517227
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851517
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491bd\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000000\t0x00000000\t0xf7fbc000\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc3c:\t0x00000000\t0xf7fbc000\t0x00000007\t0x00000000",
          "0xffffdc4c:\t0xf7df5e46\t0x00000001"
        ],
        "extra": [
          "$4 = 7",
          "$5 = 0xffffdc44"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "call: main after b=3, before pushing arguments",
        "cLine": 10,
        "asmLine": 14,
        "frame": "call_main",
        "note": "b=3 is written to EBP-8. Both locals are now in main's frame. ESP still points at the bottom of the 12-byte local area.",
        "espLabels": {},
        "eip": "0x0804917c",
        "esp": "0xffffdc3c",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517227
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851517
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491bd\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000000\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc3c:\t0x00000000\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc4c:\t0xf7df5e46\t0x00000001"
        ],
        "extra": [
          "$6 = 7",
          "$7 = 3",
          "$8 = 0xffffdc44",
          "$9 = 0xffffdc40"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "call: after push b (rightmost argument first)",
        "cLine": 11,
        "asmLine": 15,
        "frame": "call_main",
        "note": "push [ebp-8] reads b from memory, subtracts 4 from ESP, and writes 3 at the new [ESP]. GDB shows ESP changing from 0xffffdc3c to 0xffffdc38 and the word at ESP becoming 3.",
        "espLabels": {},
        "eip": "0x0804917f",
        "esp": "0xffffdc38",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517227
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851517
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491bd\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000003\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc38:\t0x00000003\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46"
        ],
        "extra": [
          "$10 = 0xffffdc38",
          "$11 = 0x3"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "call: after push a, ready for call add",
        "cLine": 11,
        "asmLine": 16,
        "frame": "call_main",
        "note": "push [ebp-4] pushes a=7. ESP is now 0xffffdc34, with 7 at [ESP] and 3 at [ESP+4]. Arguments are pushed right-to-left so that inside add, x is at EBP+8 and y is at EBP+12.",
        "espLabels": {},
        "eip": "0x08049182",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517227
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851517
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491bd\t0xf7fe3230\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x00000007\t0x00000003\t0x00000000\t0x00000003",
          "0xffffdc44:\t0x00000007\t0x00000000"
        ],
        "extra": [
          "$12 = 0xffffdc34",
          "$13 = 0x7",
          "$14 = 0x3"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "call: add entry, before its prologue (call pushed return address)",
        "cLine": 11,
        "asmLine": 17,
        "frame": "call_main",
        "note": "The call instruction has already pushed the return address 0x08049187 at ESP=0xffffdc30 and jumped to add. EBP still belongs to main at this instant; the new frame has not been created yet.",
        "espLabels": {
          "0": "return address pushed by call (0x08049187)",
          "4": "argument x = 7",
          "8": "argument y = 3"
        },
        "eip": "0x08049152",
        "esp": "0xffffdc30",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851517
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0xcc0491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491bd\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc30:\t0x08049187\t0x00000007\t0x00000003\t0x00000000",
          "0xffffdc40:\t0x00000003\t0x00000007"
        ],
        "extra": [
          "$15 = 0xffffdc30",
          "$16 = 0x8049187"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "call: add after prologue, ready to read x and y",
        "cLine": 3,
        "asmLine": 2,
        "frame": "call_add",
        "note": "add's prologue push ebp; mov ebp,esp; sub esp,4 has created a new frame. EBP is now 0xffffdc2c. The return address is at EBP+4, x at EBP+8, y at EBP+12, and the local sum at EBP-4. GDB proves this with p/x &x = 0xffffdc34 and p/x &y = 0xffffdc38.",
        "espLabels": {},
        "eip": "0x08049158",
        "esp": "0xffffdc28",
        "ebp": "0xffffdc2c",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958076,
            "val": 4294958111
          },
          {
            "addr": 4294958080,
            "val": 48
          },
          {
            "addr": 4294958084,
            "val": 4160471040
          },
          {
            "addr": 4294958088,
            "val": 4160471040
          },
          {
            "addr": 4294958092,
            "val": 4294958127
          },
          {
            "addr": 4294958096,
            "val": 39
          },
          {
            "addr": 4294958100,
            "val": 4294967295
          },
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 4294958152
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          }
        ],
        "memRaw": [
          "0xffffdbfc:\t0xffffdc1f\t0x00000030\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc0c:\t0xffffdc2f\t0x00000027\t0xffffffff\t0x00000000",
          "0xffffdc1c:\t0xcc0491eb\t0x00000001\t0xffffdcf4\t0xffffdcfc",
          "0xffffdc2c:\t0xffffdc48\t0x08049187\t0x00000007\t0x00000003",
          "0xffffdc3c:\t0x00000000\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc28:\t0xffffdcfc\t0xffffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000"
        ],
        "extra": [
          "$17 = 7",
          "$18 = 3",
          "$19 = 0xffffdc34",
          "$20 = 0xffffdc38",
          "$21 = 0x8049187",
          "$22 = 0x7",
          "$23 = 0x3",
          "GDB: raw bytes at [ebp+8]: first x, then y (little-endian)",
          "0xffffdc34:\t0x07\t0x00\t0x00\t0x00\t0x03\t0x00\t0x00\t0x00"
        ],
        "frameLabels": {
          "-4": "sum  (GDB: &sum = EBP-4)",
          "0": "saved EBP (main's EBP)",
          "4": "saved EIP / return into main",
          "8": "argument x  (GDB: &x = EBP+8)",
          "12": "argument y  (GDB: &y = EBP+12)"
        }
      },
      {
        "label": "call: after mov edx,[ebp+8] -- x read into EDX",
        "cLine": 3,
        "asmLine": 3,
        "frame": "call_add",
        "note": "mov edx,[ebp+8] reads 4 bytes from address EBP+8 = 0xffffdc34. The word there is 7, so EDX becomes 7. ESP is unchanged: this is a memory read, not a pop.",
        "espLabels": {},
        "eip": "0x0804915b",
        "esp": "0xffffdc28",
        "ebp": "0xffffdc2c",
        "eax": "0xf7fbeae8",
        "edx": "0x00000007",
        "mem": [
          {
            "addr": 4294958076,
            "val": 4294958111
          },
          {
            "addr": 4294958080,
            "val": 47
          },
          {
            "addr": 4294958084,
            "val": 4160471040
          },
          {
            "addr": 4294958088,
            "val": 4160471040
          },
          {
            "addr": 4294958092,
            "val": 4294958127
          },
          {
            "addr": 4294958096,
            "val": 39
          },
          {
            "addr": 4294958100,
            "val": 4294967295
          },
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 4294958152
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          }
        ],
        "memRaw": [
          "0xffffdbfc:\t0xffffdc1f\t0x0000002f\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc0c:\t0xffffdc2f\t0x00000027\t0xffffffff\t0x00000000",
          "0xffffdc1c:\t0xcc0491eb\t0x00000001\t0xffffdcf4\t0xffffdcfc",
          "0xffffdc2c:\t0xffffdc48\t0x08049187\t0x00000007\t0x00000003",
          "0xffffdc3c:\t0x00000000\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc28:\t0xffffdcfc\t0xffffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000"
        ],
        "extra": [
          "$24 = 0x7"
        ],
        "frameLabels": {
          "-4": "sum  (GDB: &sum = EBP-4)",
          "0": "saved EBP (main's EBP)",
          "4": "saved EIP / return into main",
          "8": "argument x  (GDB: &x = EBP+8)",
          "12": "argument y  (GDB: &y = EBP+12)"
        }
      },
      {
        "label": "call: after mov eax,[ebp+12] -- y read into EAX",
        "cLine": 3,
        "asmLine": 4,
        "frame": "call_add",
        "note": "mov eax,[ebp+12] reads from EBP+12 = 0xffffdc38. The value is 3, so EAX becomes 3. EDX still holds x=7.",
        "espLabels": {},
        "eip": "0x0804915e",
        "esp": "0xffffdc28",
        "ebp": "0xffffdc2c",
        "eax": "0x00000003",
        "edx": "0x00000007",
        "mem": [
          {
            "addr": 4294958076,
            "val": 4294958111
          },
          {
            "addr": 4294958080,
            "val": 48
          },
          {
            "addr": 4294958084,
            "val": 4160471040
          },
          {
            "addr": 4294958088,
            "val": 4160471040
          },
          {
            "addr": 4294958092,
            "val": 4294958127
          },
          {
            "addr": 4294958096,
            "val": 39
          },
          {
            "addr": 4294958100,
            "val": 4294967295
          },
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 4294958152
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          }
        ],
        "memRaw": [
          "0xffffdbfc:\t0xffffdc1f\t0x00000030\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc0c:\t0xffffdc2f\t0x00000027\t0xffffffff\t0x00000000",
          "0xffffdc1c:\t0xcc0491eb\t0x00000001\t0xffffdcf4\t0xffffdcfc",
          "0xffffdc2c:\t0xffffdc48\t0x08049187\t0x00000007\t0x00000003",
          "0xffffdc3c:\t0x00000000\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc28:\t0xffffdcfc\t0xffffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000"
        ],
        "extra": [
          "$25 = 0x3",
          "$26 = 0x7"
        ],
        "frameLabels": {
          "-4": "sum  (GDB: &sum = EBP-4)",
          "0": "saved EBP (main's EBP)",
          "4": "saved EIP / return into main",
          "8": "argument x  (GDB: &x = EBP+8)",
          "12": "argument y  (GDB: &y = EBP+12)"
        }
      },
      {
        "label": "call: after add eax,edx -- sum is now in EAX",
        "cLine": 3,
        "asmLine": 5,
        "frame": "call_add",
        "note": "add eax,edx computes 3+7 and stores the result in EAX = 0x0000000a (10). The stack has not changed at all.",
        "espLabels": {},
        "eip": "0x08049160",
        "esp": "0xffffdc28",
        "ebp": "0xffffdc2c",
        "eax": "0x0000000a",
        "edx": "0x00000007",
        "mem": [
          {
            "addr": 4294958076,
            "val": 4294958111
          },
          {
            "addr": 4294958080,
            "val": 45
          },
          {
            "addr": 4294958084,
            "val": 4160471040
          },
          {
            "addr": 4294958088,
            "val": 4160471040
          },
          {
            "addr": 4294958092,
            "val": 4294958127
          },
          {
            "addr": 4294958096,
            "val": 39
          },
          {
            "addr": 4294958100,
            "val": 4294967295
          },
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 4294958152
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          }
        ],
        "memRaw": [
          "0xffffdbfc:\t0xffffdc1f\t0x0000002d\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc0c:\t0xffffdc2f\t0x00000027\t0xffffffff\t0x00000000",
          "0xffffdc1c:\t0xcc0491eb\t0x00000001\t0xffffdcf4\t0xffffdcfc",
          "0xffffdc2c:\t0xffffdc48\t0x08049187\t0x00000007\t0x00000003",
          "0xffffdc3c:\t0x00000000\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc28:\t0xffffdcfc\t0xffffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000"
        ],
        "extra": [
          "$27 = 0xa"
        ],
        "frameLabels": {
          "-4": "sum  (GDB: &sum = EBP-4)",
          "0": "saved EBP (main's EBP)",
          "4": "saved EIP / return into main",
          "8": "argument x  (GDB: &x = EBP+8)",
          "12": "argument y  (GDB: &y = EBP+12)"
        }
      },
      {
        "label": "call: after sum is stored at [ebp-4]",
        "cLine": 3,
        "asmLine": 6,
        "frame": "call_add",
        "note": "mov [ebp-4],eax stores 10 into add's local variable sum. GDB shows [EBP-4] = 0x0000000a and &sum = 0xffffdc28.",
        "espLabels": {},
        "eip": "0x08049163",
        "esp": "0xffffdc28",
        "ebp": "0xffffdc2c",
        "eax": "0x0000000a",
        "edx": "0x00000007",
        "mem": [
          {
            "addr": 4294958076,
            "val": 4294958111
          },
          {
            "addr": 4294958080,
            "val": 37
          },
          {
            "addr": 4294958084,
            "val": 4160471040
          },
          {
            "addr": 4294958088,
            "val": 4160471040
          },
          {
            "addr": 4294958092,
            "val": 4294958127
          },
          {
            "addr": 4294958096,
            "val": 39
          },
          {
            "addr": 4294958100,
            "val": 4294967295
          },
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 10
          },
          {
            "addr": 4294958124,
            "val": 4294958152
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          }
        ],
        "memRaw": [
          "0xffffdbfc:\t0xffffdc1f\t0x00000025\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc0c:\t0xffffdc2f\t0x00000027\t0xffffffff\t0x00000000",
          "0xffffdc1c:\t0xcc0491eb\t0x00000001\t0xffffdcf4\t0x0000000a",
          "0xffffdc2c:\t0xffffdc48\t0x08049187\t0x00000007\t0x00000003",
          "0xffffdc3c:\t0x00000000\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc28:\t0x0000000a\t0xffffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000"
        ],
        "extra": [
          "$28 = 10",
          "$29 = 0xffffdc28",
          "$30 = 0xa"
        ],
        "frameLabels": {
          "-4": "sum  (GDB: &sum = EBP-4)",
          "0": "saved EBP (main's EBP)",
          "4": "saved EIP / return into main",
          "8": "argument x  (GDB: &x = EBP+8)",
          "12": "argument y  (GDB: &y = EBP+12)"
        }
      },
      {
        "label": "call: add at leave, before destroying its frame",
        "cLine": 4,
        "asmLine": 8,
        "frame": "call_add",
        "note": "EAX already holds the return value 10. The leave instruction will set ESP=EBP, pop main's saved EBP from [EBP], then ret will pop the return address 0x08049187 from [EBP+4].",
        "espLabels": {},
        "eip": "0x08049166",
        "esp": "0xffffdc28",
        "ebp": "0xffffdc2c",
        "eax": "0x0000000a",
        "edx": "0x00000007",
        "mem": [
          {
            "addr": 4294958076,
            "val": 4294958111
          },
          {
            "addr": 4294958080,
            "val": 48
          },
          {
            "addr": 4294958084,
            "val": 4160471040
          },
          {
            "addr": 4294958088,
            "val": 4160471040
          },
          {
            "addr": 4294958092,
            "val": 4294958127
          },
          {
            "addr": 4294958096,
            "val": 39
          },
          {
            "addr": 4294958100,
            "val": 4294967295
          },
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 10
          },
          {
            "addr": 4294958124,
            "val": 4294958152
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          }
        ],
        "memRaw": [
          "0xffffdbfc:\t0xffffdc1f\t0x00000030\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc0c:\t0xffffdc2f\t0x00000027\t0xffffffff\t0x00000000",
          "0xffffdc1c:\t0xcc0491eb\t0x00000001\t0xffffdcf4\t0x0000000a",
          "0xffffdc2c:\t0xffffdc48\t0x08049187\t0x00000007\t0x00000003",
          "0xffffdc3c:\t0x00000000\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc28:\t0x0000000a\t0xffffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000"
        ],
        "extra": [
          "$31 = 10",
          "$32 = 0xffffdc2c",
          "$33 = 0x8049187"
        ],
        "frameLabels": {
          "-4": "sum  (GDB: &sum = EBP-4)",
          "0": "saved EBP (main's EBP)",
          "4": "saved EIP / return into main",
          "8": "argument x  (GDB: &x = EBP+8)",
          "12": "argument y  (GDB: &y = EBP+12)"
        }
      },
      {
        "label": "call: back in main immediately after add returns",
        "cLine": 11,
        "asmLine": 9,
        "frame": "call_main",
        "note": "add's ret has restored EIP=0x08049187 and ESP=0xffffdc34, pointing at the two argument words. EAX carries the return value 10. main's EBP is back to 0xffffdc48.",
        "espLabels": {
          "0": "argument x = 7 (still on stack)",
          "4": "argument y = 3 (still on stack)"
        },
        "eip": "0x08049187",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0x0000000a",
        "edx": "0x00000007",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 10
          },
          {
            "addr": 4294958124,
            "val": 3439320136
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0xcc0491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0x0000000a\t0xccffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x00000007\t0x00000003\t0x00000000\t0x00000003",
          "0xffffdc44:\t0x00000007\t0x00000000"
        ],
        "extra": [
          "$34 = 0xa",
          "$35 = 0xffffdc34",
          "$36 = 0x7",
          "$37 = 0x3"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "call: after add esp,8 removes the two arguments",
        "cLine": 11,
        "asmLine": 18,
        "frame": "call_main",
        "note": "main cleans up the cdecl arguments with add esp,8. ESP moves from 0xffffdc34 back to 0xffffdc3c. The old 7 and 3 words are still in memory; they are simply below ESP and no longer part of the active stack.",
        "espLabels": {},
        "eip": "0x0804918a",
        "esp": "0xffffdc3c",
        "ebp": "0xffffdc48",
        "eax": "0x0000000a",
        "edx": "0x00000007",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 10
          },
          {
            "addr": 4294958124,
            "val": 3439320136
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0xcc0491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0x0000000a\t0xccffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x00000000\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc3c:\t0x00000000\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc4c:\t0xf7df5e46\t0x00000001"
        ],
        "extra": [
          "$38 = 0xffffdc3c"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "call: after result=add(a,b) is stored at [ebp-12]",
        "cLine": 11,
        "asmLine": 19,
        "frame": "call_main",
        "note": "The return value in EAX is copied into result at EBP-12. GDB shows result=10, &result=0xffffdc3c, and [EBP-12]=0x0000000a. The function call is complete.",
        "espLabels": {},
        "eip": "0x0804918d",
        "esp": "0xffffdc3c",
        "ebp": "0xffffdc48",
        "eax": "0x0000000a",
        "edx": "0x00000007",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 3422851563
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 10
          },
          {
            "addr": 4294958124,
            "val": 3439320136
          },
          {
            "addr": 4294958128,
            "val": 134517127
          },
          {
            "addr": 4294958132,
            "val": 7
          },
          {
            "addr": 4294958136,
            "val": 3
          },
          {
            "addr": 4294958140,
            "val": 10
          },
          {
            "addr": 4294958144,
            "val": 3
          },
          {
            "addr": 4294958148,
            "val": 7
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0xcc0491eb\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0x0000000a\t0xccffdc48\t0x08049187\t0x00000007",
          "0xffffdc38:\t0x00000003\t0x0000000a\t0x00000003\t0x00000007",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc3c:\t0x0000000a\t0x00000003\t0x00000007\t0x00000000",
          "0xffffdc4c:\t0xf7df5e46\t0x00000001"
        ],
        "extra": [
          "$39 = 10",
          "$40 = 0xffffdc3c",
          "$41 = 0xa",
          "[Inferior 1 (process 2099) exited with code 012]"
        ],
        "frameLabels": {
          "-4": "a  (GDB: &a = EBP-4)",
          "-8": "b  (GDB: &b = EBP-8)",
          "-12": "result  (GDB: &result = EBP-12)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      }
    ]
  },
  "array": {
    "title": "Example 3 \u2014 arrays",
    "subtitle": "int arr[3] = {10,20,30}; int pick = arr[i];",
    "source": [
      "int main(void)",
      "{",
      "    int arr[3] = {10, 20, 30};",
      "    int i = 1;",
      "    int pick = arr[i];",
      "    return pick;",
      "}"
    ],
    "asm": [
      [
        "08049152",
        "push",
        "ebp"
      ],
      [
        "08049153",
        "mov",
        "ebp, esp"
      ],
      [
        "08049155",
        "sub",
        "esp, 0x14"
      ],
      [
        "08049158",
        "mov",
        "DWORD PTR [ebp-0x14], 0xa",
        "; arr[0]"
      ],
      [
        "0804915f",
        "mov",
        "DWORD PTR [ebp-0x10], 0x14",
        "; arr[1]"
      ],
      [
        "08049166",
        "mov",
        "DWORD PTR [ebp-0xc], 0x1e",
        "; arr[2]"
      ],
      [
        "0804916d",
        "mov",
        "DWORD PTR [ebp-0x4], 0x1",
        "; i = 1"
      ],
      [
        "08049174",
        "mov",
        "eax, DWORD PTR [ebp-0x4]",
        "; load i"
      ],
      [
        "08049177",
        "mov",
        "eax, DWORD PTR [ebp+eax*4-0x14]",
        "; load arr[i]"
      ],
      [
        "0804917b",
        "mov",
        "DWORD PTR [ebp-0x8], eax",
        "; pick = value"
      ],
      [
        "0804917e",
        "mov",
        "eax, DWORD PTR [ebp-0x8]",
        "; return pick"
      ],
      [
        "08049181",
        "leave",
        ""
      ],
      [
        "08049182",
        "ret",
        ""
      ]
    ],
    "steps": [
      {
        "label": "array: main after prologue, before array initialization",
        "cLine": 3,
        "asmLine": 2,
        "frame": "array",
        "note": "main reserved 20 bytes with sub esp,0x14. GDB shows the array base &arr[0] = 0xffffdc34 and &arr[1] = 0xffffdc38, exactly 4 bytes apart. The array does not exist as one object in registers; it is just three consecutive 4-byte words in stack memory.",
        "espLabels": {},
        "eip": "0x08049158",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 0
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 4160471040
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x00000000",
          "0xffffdc38:\t0x00000000\t0x00000000\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x00000000\t0x00000000\t0x00000000\t0xf7fbc000",
          "0xffffdc44:\t0xf7fbc000\t0x00000000"
        ],
        "extra": [
          "$1 = 0xffffdc34",
          "$2 = 0xffffdc34",
          "$3 = 0xffffdc38",
          "$4 = 0xffffdc3c",
          "$5 = 0xffffdc44",
          "$6 = 0xffffdc40"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "array: after arr[0]=10 is stored",
        "cLine": 3,
        "asmLine": 3,
        "frame": "array",
        "note": "mov DWORD PTR [ebp-0x14],0xa writes 10 to the first array element. GDB p arr[0] prints 10 and p/x &arr[0] prints 0xffffdc34.",
        "espLabels": {},
        "eip": "0x0804915f",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 10
          },
          {
            "addr": 4294958136,
            "val": 0
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 4160471040
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x0000000a",
          "0xffffdc38:\t0x00000000\t0x00000000\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x0000000a\t0x00000000\t0x00000000\t0xf7fbc000",
          "0xffffdc44:\t0xf7fbc000\t0x00000000"
        ],
        "extra": [
          "$7 = 10",
          "$8 = 0xffffdc34"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "array: after arr[1]=20 is stored",
        "cLine": 3,
        "asmLine": 4,
        "frame": "array",
        "note": "The second element goes at EBP-0x10, which is 4 bytes above arr[0]. GDB shows &arr[0]=0xffffdc34 and &arr[1]=0xffffdc38.",
        "espLabels": {},
        "eip": "0x08049166",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 10
          },
          {
            "addr": 4294958136,
            "val": 20
          },
          {
            "addr": 4294958140,
            "val": 0
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 4160471040
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x0000000a",
          "0xffffdc38:\t0x00000014\t0x00000000\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x0000000a\t0x00000014\t0x00000000\t0xf7fbc000",
          "0xffffdc44:\t0xf7fbc000\t0x00000000"
        ],
        "extra": [
          "$9 = 10",
          "$10 = 20",
          "$11 = 0xffffdc34",
          "$12 = 0xffffdc38"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "array: after arr[2]=30 is stored -- whole array is in memory",
        "cLine": 3,
        "asmLine": 5,
        "frame": "array",
        "note": "The third element is at EBP-0xc. GDB's x/4wx &arr[0] shows 0x0000000a 0x00000014 0x0000001e in consecutive words. The byte dump shows 0a 00 00 00 14 00 00 00 1e 00 00 00, which is little-endian for 10, 20, 30.",
        "espLabels": {},
        "eip": "0x0804916d",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 10
          },
          {
            "addr": 4294958136,
            "val": 20
          },
          {
            "addr": 4294958140,
            "val": 30
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 4160471040
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x0000000a",
          "0xffffdc38:\t0x00000014\t0x0000001e\t0xf7fbc000\t0xf7fbc000",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x0000000a\t0x00000014\t0x0000001e\t0xf7fbc000",
          "0xffffdc44:\t0xf7fbc000\t0x00000000"
        ],
        "extra": [
          "$13 = 10",
          "$14 = 20",
          "$15 = 30",
          "$16 = 0xffffdc34",
          "$17 = 0xffffdc38",
          "$18 = 0xffffdc3c",
          "GDB: dump the three array elements as words",
          "0xffffdc34:\t0x0000000a\t0x00000014\t0x0000001e\t0xf7fbc000",
          "GDB: the same 12 bytes, one byte at a time (little-endian ints)",
          "0xffffdc34:\t0x0a\t0x00\t0x00\t0x00\t0x14\t0x00\t0x00\t0x00",
          "0xffffdc3c:\t0x1e\t0x00\t0x00\t0x00"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "array: after i=1 is stored",
        "cLine": 4,
        "asmLine": 6,
        "frame": "array",
        "note": "The index i is also just a local variable at EBP-4. GDB shows i=1 and &i=0xffffdc44, one word below the saved EBP.",
        "espLabels": {},
        "eip": "0x08049174",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0xf7fbeae8",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 10
          },
          {
            "addr": 4294958136,
            "val": 20
          },
          {
            "addr": 4294958140,
            "val": 30
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 1
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x0000000a",
          "0xffffdc38:\t0x00000014\t0x0000001e\t0xf7fbc000\t0x00000001",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x0000000a\t0x00000014\t0x0000001e\t0xf7fbc000",
          "0xffffdc44:\t0x00000001\t0x00000000"
        ],
        "extra": [
          "$19 = 1",
          "$20 = 0xffffdc44"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "array: after mov eax,[ebp-4] -- index i is now in EAX",
        "cLine": 5,
        "asmLine": 7,
        "frame": "array",
        "note": "The compiler loads i into EAX so it can use it as an index. EAX is now 1. This is a normal memory read from EBP-4; ESP is unchanged.",
        "espLabels": {},
        "eip": "0x08049177",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0x00000001",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 10
          },
          {
            "addr": 4294958136,
            "val": 20
          },
          {
            "addr": 4294958140,
            "val": 30
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 1
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x0000000a",
          "0xffffdc38:\t0x00000014\t0x0000001e\t0xf7fbc000\t0x00000001",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x0000000a\t0x00000014\t0x0000001e\t0xf7fbc000",
          "0xffffdc44:\t0x00000001\t0x00000000"
        ],
        "extra": [
          "$21 = 1",
          "$22 = 0x1"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "array: after mov eax,[ebp+eax*4-0x14] -- arr[i] read from memory",
        "cLine": 5,
        "asmLine": 8,
        "frame": "array",
        "note": "The addressing mode computes EBP + EAX*4 - 0x14. With EAX=1, that is 0xffffdc48 + 4 - 0x14 = 0xffffdc38, the address GDB prints for &arr[1]. The 4-byte word there is 20, so EAX becomes 0x14.",
        "espLabels": {},
        "eip": "0x0804917b",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0x00000014",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 10
          },
          {
            "addr": 4294958136,
            "val": 20
          },
          {
            "addr": 4294958140,
            "val": 30
          },
          {
            "addr": 4294958144,
            "val": 4160471040
          },
          {
            "addr": 4294958148,
            "val": 1
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x0000000a",
          "0xffffdc38:\t0x00000014\t0x0000001e\t0xf7fbc000\t0x00000001",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x0000000a\t0x00000014\t0x0000001e\t0xf7fbc000",
          "0xffffdc44:\t0x00000001\t0x00000000"
        ],
        "extra": [
          "$23 = 0x14",
          "GDB: address of arr[i], computed from the actual index i",
          "$24 = 0xffffdc38",
          "$25 = 0xffffdc38"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "array: after pick=arr[i] is stored at [ebp-8]",
        "cLine": 5,
        "asmLine": 9,
        "frame": "array",
        "note": "The loaded value 20 is copied to pick at EBP-8. GDB shows pick=20, &pick=0xffffdc40, and [EBP-8]=0x00000014.",
        "espLabels": {},
        "eip": "0x0804917e",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0x00000014",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 10
          },
          {
            "addr": 4294958136,
            "val": 20
          },
          {
            "addr": 4294958140,
            "val": 30
          },
          {
            "addr": 4294958144,
            "val": 20
          },
          {
            "addr": 4294958148,
            "val": 1
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x0000000a",
          "0xffffdc38:\t0x00000014\t0x0000001e\t0x00000014\t0x00000001",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x0000000a\t0x00000014\t0x0000001e\t0x00000014",
          "0xffffdc44:\t0x00000001\t0x00000000"
        ],
        "extra": [
          "$26 = 20",
          "$27 = 0xffffdc40",
          "$28 = 0x14"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      },
      {
        "label": "array: at leave, before returning pick",
        "cLine": 6,
        "asmLine": 10,
        "frame": "array",
        "note": "EAX already contains pick=20. leave/ret will return it. The array values remain in memory, but the frame is about to be abandoned.",
        "espLabels": {},
        "eip": "0x08049181",
        "esp": "0xffffdc34",
        "ebp": "0xffffdc48",
        "eax": "0x00000014",
        "edx": "0xffffdc84",
        "mem": [
          {
            "addr": 4294958104,
            "val": 0
          },
          {
            "addr": 4294958108,
            "val": 134517211
          },
          {
            "addr": 4294958112,
            "val": 1
          },
          {
            "addr": 4294958116,
            "val": 4294958324
          },
          {
            "addr": 4294958120,
            "val": 4294958332
          },
          {
            "addr": 4294958124,
            "val": 3422851501
          },
          {
            "addr": 4294958128,
            "val": 4160631344
          },
          {
            "addr": 4294958132,
            "val": 10
          },
          {
            "addr": 4294958136,
            "val": 20
          },
          {
            "addr": 4294958140,
            "val": 30
          },
          {
            "addr": 4294958144,
            "val": 20
          },
          {
            "addr": 4294958148,
            "val": 1
          },
          {
            "addr": 4294958152,
            "val": 0
          },
          {
            "addr": 4294958156,
            "val": 4158611014
          },
          {
            "addr": 4294958160,
            "val": 1
          },
          {
            "addr": 4294958164,
            "val": 4294958324
          },
          {
            "addr": 4294958168,
            "val": 4294958332
          },
          {
            "addr": 4294958172,
            "val": 4294958212
          },
          {
            "addr": 4294958176,
            "val": 4294958228
          },
          {
            "addr": 4294958180,
            "val": 4160740160
          }
        ],
        "memRaw": [
          "0xffffdc18:\t0x00000000\t0x080491db\t0x00000001\t0xffffdcf4",
          "0xffffdc28:\t0xffffdcfc\t0xcc0491ad\t0xf7fe3230\t0x0000000a",
          "0xffffdc38:\t0x00000014\t0x0000001e\t0x00000014\t0x00000001",
          "0xffffdc48:\t0x00000000\t0xf7df5e46\t0x00000001\t0xffffdcf4",
          "0xffffdc58:\t0xffffdcfc\t0xffffdc84\t0xffffdc94\t0xf7ffdb40",
          "0xffffdc34:\t0x0000000a\t0x00000014\t0x0000001e\t0x00000014",
          "0xffffdc44:\t0x00000001\t0x00000000"
        ],
        "extra": [
          "$29 = 20",
          "$30 = 10",
          "$31 = 20",
          "$32 = 30",
          "[Inferior 1 (process 2107) exited with code 024]"
        ],
        "frameLabels": {
          "-20": "arr[0]  (GDB: &arr[0] = EBP-0x14)",
          "-16": "arr[1]  (GDB: &arr[1] = EBP-0x10)",
          "-12": "arr[2]  (GDB: &arr[2] = EBP-0xc)",
          "-8": "pick  (GDB: &pick = EBP-8)",
          "-4": "i  (GDB: &i = EBP-4)",
          "0": "saved EBP (main's caller)",
          "4": "saved EIP / return address into libc startup"
        }
      }
    ]
  }
};
