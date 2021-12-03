
toInt a = read a::Int

main :: IO ()
main = do
    contents <- readFile "input"
    let input = map toInt (lines contents)
    let diff = zipWith subtract (drop 3 input) input
    let larger = filter (<0) diff
    print (length larger)
