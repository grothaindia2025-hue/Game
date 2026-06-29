const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff,0.7));

// Blocks
const geo = new THREE.BoxGeometry(1,1,1);
const mat = new THREE.MeshLambertMaterial({color:0x22aa22});

for(let x=-15;x<=15;x++){
  for(let z=-15;z<=15;z++){
    const cube = new THREE.Mesh(geo,mat);
    cube.position.set(x,0,z);
    scene.add(cube);
  }
}

camera.position.set(0,4,8);
camera.lookAt(0,0,0);

// Mobile buttons
const move={up:false,down:false,left:false,right:false};

function bind(id,key){
const b=document.getElementById(id);

b.ontouchstart=()=>move[key]=true;
b.ontouchend=()=>move[key]=false;
}

bind("up","up");
bind("down","down");
bind("left","left");
bind("right","right");

function animate(){

requestAnimationFrame(animate);

const s=0.10;

if(move.up)camera.position.z-=s;
if(move.down)camera.position.z+=s;
if(move.left)camera.position.x-=s;
if(move.right)camera.position.x+=s;

camera.lookAt(camera.position.x,0,camera.position.z-5);

renderer.render(scene,camera);

}

animate();