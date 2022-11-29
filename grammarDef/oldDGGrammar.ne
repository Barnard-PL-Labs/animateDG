formula ->
    "!" formula | formula "||" formula | formula "&&" formula |
    formula "U" formula | "G" formula | "F" formula | "X" formula | formula "->" formula |
    formula "<->" formula | "[" sig_in "<-" fxnTerm "]" | sig_in
fxnTerm -> sig_in | function | primitive
function -> "sin(" primitive ")" | "saw(" primitive ")" | "color" real real real
primitive -> "t" | "count" | "rand" | real | math
sig_in -> color | scale | position | rotation
sig_out ->  "pressL(e)" | "pressR(e)" | "pressUp(e)" | "pressDown(e)" | "pressSpace(e)"
real ->  "0.1" | "-0.1" | "2" | "255" | "0"
rotation -> "cube.rotation.x" | "cube.rotation.y" | "cube.rotation.z" | "polygon.rotation.x" |
    "polygon.rotation.y" | "polygon.rotation.z" | "sphere.rotation.x" | "sphere.rotation.y" |
    "sphere.rotation.z"
position -> "cube.position.x" | "cube.position.y" | "cube.position.z" | "polygon.position.x" |
    "polygon.position.y" | "polygon.position.z" | "sphere.position.x" | "sphere.position.y" |
    "sphere.position.z"
scale -> "cube.scale.x" | "cube.scale.y" | "cube.scale.z" | "polygon.scale.x" |
    "polygon.scale.y" | "polygon.scale.z" | "sphere.scale.x" | "sphere.scale.y" |
    "sphere.scale.z"
color -> "cubeColor" | "polyColor" | "sphereColor"
