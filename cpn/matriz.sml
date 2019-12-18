fun matrizxlista(matriz, lista) =
    let
        val hmatriz = hd matriz
        val tmatriz = tl matriz
		fun listaxlista(soma, lista1, lista2) = 
		let 
			val hlista1 = hd lista1
			val tlista1 = tl lista1
			val hlista2:int = hd lista2
			val tlista2 = tl lista2
		in
			if (List.null tlista1) then
				soma + hlista1 * hlista2
			else (
				listaxlista(soma + (hlista1 * hlista2), tlista1, tlista2)
			)
		end
		fun picklist(produto, matriz, lista) = 
			let
				val hmatriz = hd matriz
				val tmatriz = tl matriz
			in
				if List.null tmatriz then
					produto ^^ [listaxlista(0, hmatriz, lista)]
				else(
					picklist(produto ^^ [listaxlista(0, hmatriz, lista)], tmatriz, lista)
				)
		end
	in
		if length hmatriz = length lista then
			picklist ([], matriz, lista)
		else
			[]
end;
fun transposta (m) =
	List.tabulate (List.length (List.nth (m, 0)), fn x => List.map (fn y => (List.nth (y, x))) m)
				
fun matrizxmatriz(mA, mB) =
    let
        val hmA = hd mA
        val tmA = tl mA
		val TmB = transposta(mB)
		fun listaxlista(soma, lista1, lista2) = 
		let 
			val hlista1 = hd lista1
			val tlista1 = tl lista1
			val hlista2:int = hd lista2
			val tlista2 = tl lista2
		in
			if (List.null tlista1) then
				soma + hlista1 * hlista2
			else (
				listaxlista(soma + (hlista1 * hlista2), tlista1, tlista2)
			)
		end
		fun picklist(produto, mA, hmB) = 
			let
				val hmA = hd mA
				val tmA = tl mA
			in
				if List.null tmA then
					produto ^^ [listaxlista(0, hmA, hmB)]
				else(
					picklist(produto ^^ [listaxlista(0, hmA, hmB)], tmA, hmB)
				)
		end
		fun pick(produto, mA, mB) = 
			let
				val hmB = hd mB
				val tmB = tl mB
			in
				if List.null tmB then
					produto ^^ [picklist([], mA, hmB)]
				else(
					pick(produto ^^ [picklist([], mA, hmB)], mA, tmB)
				)
		end
	in
		if length hmA = length mB then
			transposta(pick ([], mA, TmB))
		else
			[]
end;
(*
transposta([[7,8],[9,10],[11,12]]);

matrizxmatriz([[1,2,3],[4,5,6]], [[7,8],[9,10],[11,12]]);
*)
