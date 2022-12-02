//create the scene and position the camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 5 );
camera.position.z = 2;
camera.position.set(0, 1, 2); //this makes the cube look at an angle
camera.lookAt(0, 0, 0);

//creating the cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
let cube = new THREE.Mesh(geometry, material);

//creating a dodecahedron
const geometry1 = new THREE.DodecahedronGeometry(0.8, 0);
const material1 = new THREE.MeshStandardMaterial({ color: 0xffffff });
let polygon = new THREE.Mesh(geometry1, material1);

//creating a sphere
const sphereGeometry = new THREE.SphereGeometry(0.7);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

//create the renderer
let renderer, cubeColor, polyColor, sphereColor, rand, t;
let count = 0;

//boolean stuff for sceneBuild and animate
let check = true; 
let test;
test = !check;
let firstClick = true; 
let codeChange = false;

function call(editorNum){
    if(firstClick==true){
        callSynth(editorNum);
        sceneBuild();
    }
    else{
        callSynth(editorNum);
    }
}

function sceneBuild() { //function called when "Animate" is pressed
    firstClick = !firstClick
    renderer = new THREE.WebGLRenderer();
    check = !check;
    console.log(check);

    renderer.setSize( window.innerWidth/4, window.innerHeight/4 );
    document.getElementById("render").appendChild( renderer.domElement )
    currentState = 0;
    function animate(){
        if(test == check){
            requestAnimationFrame(animate);
            t += 0.1;
            rand = Math.random();
            updateState(myEvent);
            cube.material.color.set(cubeColor);
            polygon.material.color.set(polyColor);
            sphere.material.color.set(sphereColor);
            myEvent = "";
            renderer.clear();
            renderer.render( scene, camera );
        }
        else{
            renderer.clear();
        }
    }
    animate();
}
function callSynth(id) {
    let prevSynthesized = document.getElementById("synth_script");
    if(prevSynthesized) {
        prevSynthesized.remove();
    }
    reset(cube);
    reset(polygon);
    reset(sphere);

    if (id==0){
        // structured editor
        tslSpec = delDel(extractContent(document.getElementById("assume").innerText,
            document.getElementById("guarantee").innerText));
    }
    else if (id==1){
        // text editor
        tslSpec = document.getElementById("specBox").value;
    }

    targetLang = "js";

    // get the object that we are dealing with
    scene.clear();

    if (tslSpec.includes("cube")){
        reset(cube);
        scene.add(cube);
    }
    if (tslSpec.includes("polygon")){
        reset(polygon);
        scene.add(polygon);
    }
    if (tslSpec.includes("sphere")){
        reset(sphere);
        scene.add(sphere);
    }

    const pointLight = new THREE.PointLight(0xfffffff);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    let userID = getCookie("userID")
    console.log(userID)

    $.post("https://graphviz-web-vvxsiayuzq-ue.a.run.app/tslsynth", {tsl: tslSpec, target: targetLang, user: userID}, function(data){
        document.getElementById("codeBox").value = data;
        let script = document.createElement("script");
        script.text = "function updateState(e){\n" + data + "}";
        script.setAttribute("id", "synth_script");
        document.body.appendChild(script);
        if(renderer != null && firstClick == false) {
            renderer.clear();
            codeChange = true;
        }
    })
}

function toTE() {
    document.getElementById('specBox').innerHTML = delDel(extractContent(document.getElementById("assume").innerText,
        document.getElementById("guarantee").innerText));
    document.getElementsByClassName('SE')[0].
        style.display = 'none';
    document.getElementsByClassName('TE')[0].
        style.display = 'initial';
    editorNum = 1;
}

function toSE() {
    document.getElementsByClassName('TE')[0].
        style.display = 'none';
    document.getElementsByClassName('SE')[0].
        style.display = 'initial';
    editorNum = 0;
}

function extractContent (assumeBody, guaranteeBody) {
    let htmlBody = assumeBody + '\n' + guaranteeBody;
    const logicText = document.createElement('span')
    logicText.innerHTML = htmlBody;
    return logicText.innerText;
}

function submit(){
    ID = document.getElementById("userID")
    document.cookie = `userID=${ID.value}`
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function zoom(obj){
    if(obj.innerHTML=="Zoom out animation") {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    else{
        renderer.setSize(window.innerWidth/4, window.innerHeight/4);
    }
}

function changeVal(obj){
    if(obj.innerHTML=="Zoom out animation"){
        obj.innerHTML="Zoom in animation";
    }else if(obj.innerHTML=="Zoom in animation"){
        obj.innerHTML="Zoom out animation";
    }
}

function reset(c){
    c.scale.set(1, 1, 1);
    c.position.set(0, 0, 0);
    c.rotation.set(0, 0, 0);
    t = 0;
    count = 0;
    cubeColor = 0xffffff;
    polyColor = 0xffffff;
    sphereColor = 0xffffff;
}