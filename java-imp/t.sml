fun readProtocol s =
let
  val str = Byte.bytesToString(s);
  val sep = String.tokens (fn c => c = #"|") str
in
  (
    List.nth(sep,0),
	valOf(Int.fromString(List.nth(sep,1))),
	valOf(Int.fromString(List.nth(sep,2)))
  )
end;

readProtocol("prot|2|123")