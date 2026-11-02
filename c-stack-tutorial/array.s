	.file	"array.c"
	.intel_syntax noprefix
# GNU C17 (Debian 10.2.1-6) version 10.2.1 20210110 (x86_64-linux-gnu)
#	compiled by GNU C version 10.2.1 20210110, GMP version 6.2.1, MPFR version 4.1.0, MPC version 1.2.0, isl version isl-0.23-GMP

# GGC heuristics: --param ggc-min-expand=100 --param ggc-min-heapsize=131072
# options passed:  -imultilib 32 -imultiarch i386-linux-gnu array.c -m32
# -masm=intel -mpreferred-stack-boundary=2 -mtune=generic -march=i686
# -auxbase-strip array.s -O0 -fno-pie -fno-stack-protector
# -fno-asynchronous-unwind-tables -fverbose-asm
# options enabled:  -faggressive-loop-optimizations -fallocation-dce
# -fauto-inc-dec -fdelete-null-pointer-checks -fdwarf2-cfi-asm
# -fearly-inlining -feliminate-unused-debug-symbols
# -feliminate-unused-debug-types -ffp-int-builtin-inexact -ffunction-cse
# -fgcse-lm -fgnu-unique -fident -finline-atomics -fipa-stack-alignment
# -fira-hoist-pressure -fira-share-save-slots -fira-share-spill-slots
# -fivopts -fkeep-static-consts -fleading-underscore -flifetime-dse
# -fmath-errno -fmerge-debug-strings -fpcc-struct-return -fpeephole -fplt
# -fprefetch-loop-arrays -fsched-critical-path-heuristic
# -fsched-dep-count-heuristic -fsched-group-heuristic -fsched-interblock
# -fsched-last-insn-heuristic -fsched-rank-heuristic -fsched-spec
# -fsched-spec-insn-heuristic -fsched-stalled-insns-dep -fschedule-fusion
# -fsemantic-interposition -fshow-column -fshrink-wrap-separate
# -fsigned-zeros -fsplit-ivs-in-unroller -fssa-backprop -fstdarg-opt
# -fstrict-volatile-bitfields -fsync-libcalls -ftrapping-math -ftree-cselim
# -ftree-forwprop -ftree-loop-if-convert -ftree-loop-im -ftree-loop-ivcanon
# -ftree-loop-optimize -ftree-parallelize-loops= -ftree-phiprop
# -ftree-reassoc -ftree-scev-cprop -funit-at-a-time -fverbose-asm
# -fzero-initialized-in-bss -m32 -m80387 -m96bit-long-double
# -malign-stringops -mavx256-split-unaligned-load
# -mavx256-split-unaligned-store -mfancy-math-387 -mfp-ret-in-387 -mglibc
# -mieee-fp -mlong-double-80 -mno-red-zone -mno-sse4 -mpush-args -msahf
# -mtls-direct-seg-refs -mvzeroupper

	.text
	.globl	main
	.type	main, @function
main:
	push	ebp	#
	mov	ebp, esp	#,
	sub	esp, 20	#,
# array.c:3:     int arr[3] = {10, 20, 30};
	mov	DWORD PTR [ebp-20], 10	# arr[0],
	mov	DWORD PTR [ebp-16], 20	# arr[1],
	mov	DWORD PTR [ebp-12], 30	# arr[2],
# array.c:4:     int i = 1;
	mov	DWORD PTR [ebp-4], 1	# i,
# array.c:5:     int pick = arr[i];
	mov	eax, DWORD PTR [ebp-4]	# tmp84, i
	mov	eax, DWORD PTR [ebp-20+eax*4]	# tmp85, arr[i_5]
	mov	DWORD PTR [ebp-8], eax	# pick, tmp85
# array.c:6:     return pick;
	mov	eax, DWORD PTR [ebp-8]	# _7, pick
# array.c:7: }
	leave	
	ret	
	.size	main, .-main
	.ident	"GCC: (Debian 10.2.1-6) 10.2.1 20210110"
	.section	.note.GNU-stack,"",@progbits
