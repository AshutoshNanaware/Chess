import * as THREE from 'https://cdn.skypack.dev/three@0.121.1';

import {
    OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import {
    OBJLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/OBJLoader.js';

const params = {
    color: '#ffffff'
};
const mouse = new THREE.Vector2();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const raycaster = new THREE.Raycaster();
let white_pices=[]
let black_pices=[]
let selectedPice;
let White=new THREE.Group()
let Black=new THREE.Group()
White.name="white"
Black.name="black"

let clicked_black=false
let clicked_white=false

let pwan_array_black =new THREE.Group()
pwan_array_black.name="blackPwan"
let pwan_array_white = new THREE.Group()
pwan_array_white.name="whitePwan"

let whiteKing = new THREE.Group();
whiteKing.name="whiteKing"
let blackKing = new THREE.Group();
blackKing.name="blackKing"

let whiteQueen = new THREE.Group();
whiteQueen.name="whiteQueen"
let blackQueen = new THREE.Group();
blackQueen.name="blackQueen"

let blackRook = new THREE.Group();
blackRook.name="blackRook"
let whiteRook = new THREE.Group();
whiteRook.name="whiteRook"

let blackKnight = new THREE.Group();
blackKnight.name="blackKnight"

let whiteKnight = new THREE.Group();
whiteKnight.name="whiteKnight"

let blackBishop = new THREE.Group();
blackBishop.name="blackBishop"
let whiteBishop = new THREE.Group();
whiteBishop.name="whiteBishop"

let chessBoard = new THREE.Group();
chessBoard.name="chessBoard"

const b = new THREE.Vector3();
const new_size_pawn = new THREE.Vector3(0, 0, 0.5);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight);
const light = new THREE.AmbientLight(0x404040); // soft white light


scene.background = new THREE.Color(params.color);

camera.position.z = 20;
camera.position.y = -3;
camera.position.x = 4;



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



let lightMaterial, darkMaterial;

lightMaterial = new THREE.MeshBasicMaterial({
    color: 0xc5c5c5
});

darkMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000
});


let boxGeometry = new THREE.BoxGeometry(1, 1, 1);


// instantiate a loader
const loader = new OBJLoader();


const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("mousemove", function (e) {

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
   
    });
    
    window.addEventListener("click",onClick );
        
    function onClick(event) {
        raycaster.setFromCamera(mouse, camera);
        
        let intersects_white = raycaster.intersectObjects(White.children);
        let intersects_black = raycaster.intersectObjects(Black.children);

        if (intersects_white.length > 0 &&  !clicked_white ) {
          selectedPice= intersects_white[0].object
          clicked_white=true;

        }if(clicked_white &&intersects_white.length ===0){
            console.log("SELECETED")
            clicked_white=false; 
            raycaster.setFromCamera(mouse, camera);
            let intersects_board = raycaster.intersectObjects(chessBoard.children);

            if (intersects_board.length > 0 && intersects_board[0].object.userData.squareNumber) {
                 const targetSquare = intersects_board[0].object.position;               
                 movePices(targetSquare)        
               
              }
        }

        if (intersects_black.length > 0 &&  !clicked_black ) {
            selectedPice= intersects_black[0].object
            clicked_black=true;
  
          }if(clicked_black &&intersects_black.length ===0){
              console.log("SELECETED")
              clicked_black=false; 
              raycaster.setFromCamera(mouse, camera);
              let intersects_board = raycaster.intersectObjects(chessBoard.children);
  
              if (intersects_board.length > 0 && intersects_board[0].object.userData.squareNumber) {
                   const targetSquare = intersects_board[0].object.position;               
                   movePices(targetSquare)        
               
                }
          }




        return;
    }

function resetMaterials(props) {
        for (let i = 0; i < props.children.length; i++) {
          if (props.children[i].material) {
            props.children[i].material.opacity =  1.0;
          }
        }
      }
function hoverPieces(props) {
        raycaster.setFromCamera(mouse, camera);
        let Mesh_selected;
        const intersects = raycaster.intersectObjects(props.children,false );
        for (let i = 0; i < intersects.length; i++) {
          intersects[i].object.material.transparent = true;
          intersects[i].object.material.opacity = 0.5;
          if( intersects[i].name==="blackpwan"){
            console.log(Mesh_selected)
           
            Mesh_selected.set.position.z=3
          }
          
        }
    }
    

function loadPawnObject() {
    loader.load(
        // resource URL
        'asset/pawn.obj',
        // called when resource is loaded
        function (object) {

       
            // black pwan
      
            
            for (let i = 0; i < 8; i++) {
                let mesh_black = new THREE.Mesh(object.children[0].geometry, darkMaterial.clone());
             
                mesh_black.scale.set(0.1, 0.1, 0.1);
                mesh_black.position.y = 0.5;
                mesh_black.position.x = i;
                mesh_black.position.z = 1;
                mesh_black.name="blackPawn"
                
                Black.add(mesh_black)
               
            }   

            //white pawn 
         
            for (let i = 0; i < 8; i++) {
                     
                let mesh_white = new THREE.Mesh(object.children[0].geometry, lightMaterial.clone());
                mesh_white.scale.set(0.1, 0.1, 0.1);
                mesh_white.position.y = 0.5;
                mesh_white.position.x = i;
                mesh_white.position.z = 6;
                mesh_white.name="whitePawn"
         
                White.add(mesh_white)
            }
            black_pices.push(pwan_array_black)
            white_pices.push(pwan_array_white)
        },
        // called when loading is in progresses
        function (xhr) {


        },
        // called when loading has errors
        function (error) {

            console.log('An error happened' + error);

        }
    );
}

function loadKingobject() {
    loader.load(
        // resource URL
        'asset/king.obj',
        // called when resource is loaded
        function (object) {
            let mesh_black = new THREE.Mesh(object.children[0].geometry, darkMaterial.clone());
            let mesh_white = new THREE.Mesh(object.children[0].geometry, lightMaterial.clone());
    
            mesh_black.scale.set(0.2, 0.2, 0.2);
            mesh_black.position.y = 0.5;
            mesh_black.position.z = 0;
            mesh_black.position.x = 4;
            mesh_black.name = "blackKing";

            Black.add(mesh_black)
            mesh_white.scale.set(0.2, 0.2, 0.2);
            mesh_white.position.y = 0.5;
            mesh_white.position.z = 7;
            mesh_white.position.x = 4;
            mesh_white.name = "whiteKing";
     
            White.add(mesh_white)
      
            black_pices.push(blackKing)
            white_pices.push(whiteKing)


        },
        // called when loading is in progresses
        function (xhr) {



        },
        // called when loading has errors
        function (error) {

            console.log('An error happened' + error);

        }
    );
}

function loadQueenobject() {
    loader.load(
        // resource URL
        'asset/queen.obj',
        // called when resource is loaded
        function (object) {

            let mesh_black = new THREE.Mesh(object.children[0].geometry, darkMaterial.clone());
            let mesh_white = new THREE.Mesh(object.children[0].geometry, lightMaterial.clone());
            //black queen
            mesh_black.scale.set(0.3, 0.3, 0.3);
            mesh_black.position.y = 0.5;
            mesh_black.position.z = 0;
            mesh_black.position.x = 3;
            mesh_black.name="blackQueen"
           
            Black.add(mesh_black)

            //white queen
            mesh_white.scale.set(0.3, 0.3, 0.3);
            mesh_white.position.y = 0.5;
            mesh_white.position.x = 3;
            mesh_white.position.z = 7;
            mesh_white.name="whiteQueen"
          
           White.add(mesh_white)
            
            black_pices.push(blackQueen)
            white_pices.push(whiteQueen)
        },
        // called when loading is in progresses
        function (xhr) {

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened' + error);
        }
    );
}

function loadRookobject() {
    loader.load(
        // resource URL
        'asset/rook.obj',
        // called when resource is loaded
        function (object) {
            
       //black rook

            for(let i=0;i<8;i=i+7){
                let mesh_black = new THREE.Mesh(object.children[0].geometry, darkMaterial.clone());
                mesh_black.scale.set(0.4, 0.4, 0.4);
                mesh_black.position.y = 0.5;
                mesh_black.position.z = 0;
                mesh_black.position.x = i;
                mesh_black.name="blackRook"
             
                Black.add(mesh_black)
            }

        //white rook
            for(let i=0;i<8;i=i+7){
                let mesh_white = new THREE.Mesh(object.children[0].geometry, lightMaterial.clone());
                mesh_white.scale.set(0.4, 0.4, 0.4);
                mesh_white.position.y = 0.5;
                mesh_white.position.z = 7;
                mesh_white.position.x = i;
                mesh_white.name="whiteRook"
               
                White.add(mesh_white)
            }
            
            black_pices.push(blackRook)
            white_pices.push(whiteRook)

        },
        // called when loading is in progresses
        function (xhr) {

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened' + error);
        }
    );
}

function loadBishopobject() {
    loader.load(
        // resource URL
        'asset/bishop.obj',
        // called when resource is loaded
        function (object) {



             //black rook

             for(let i=2;i<8;i=i+3){
                let mesh_black = new THREE.Mesh(object.children[0].geometry, darkMaterial.clone());
                mesh_black.scale.set(0.4, 0.4, 0.4);
                mesh_black.position.y = 0.5;
                mesh_black.position.z = 0;
                mesh_black.position.x = i;
                mesh_black.name="blackBishop"

                Black.add(mesh_black)
            }

        //white rook
            for(let i=2;i<8;i=i+3){
                let mesh_white = new THREE.Mesh(object.children[0].geometry, lightMaterial.clone());
                mesh_white.scale.set(0.4, 0.4, 0.4);
                mesh_white.position.y = 0.5;
                mesh_white.position.z = 7;
                mesh_white.position.x = i;

                mesh_white.name="whiteBishop"
         
                White.add(mesh_white)
            }
                
            black_pices.push(blackBishop)
            white_pices.push(whiteBishop)

        },
        // called when loading is in progresses
        function (xhr) {

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened' + error);
        }
    );
}

function loadKnightbject() {
    loader.load(
        // resource URL
        'asset/knight.obj',
        // called when resource is loaded
        
        //blackknight
        function (object) {

            for(let i=1;i<8;i=i+5){
                let mesh_black = new THREE.Mesh(object.children[0].geometry, darkMaterial.clone());
                mesh_black.scale.set(0.4, 0.4, 0.4);
                mesh_black.position.y = 0.5;
                mesh_black.position.z = 0;
                mesh_black.position.x = i;
                
                mesh_black.name="blackKnight"

             
                Black.add(mesh_black)
            }

        //white knight
            for(let i=1;i<8;i=i+5){
                let mesh_white = new THREE.Mesh(object.children[0].geometry, lightMaterial.clone());
                mesh_white.scale.set(0.4, 0.4, 0.4);
                mesh_white.position.y = 0.5;
                mesh_white.position.z = 7;
                mesh_white.position.x = i;
                mesh_white.name="whiteKnight"
          
                White.add(mesh_white)
                
            }

            black_pices.push(blackKnight)
            white_pices.push(whiteKnight)

        },
        // called when loading is in progresses
        function (xhr) {

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened' + error);
        }
    );
}

function createChessBoard() {
   let number=1;
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let cube;
            if (y % 2 == false) {
                cube = new THREE.Mesh(boxGeometry, x % 2 == false ? lightMaterial : darkMaterial);
            } else {
                cube = new THREE.Mesh(boxGeometry, x % 2 == true ? lightMaterial : darkMaterial);
            }
            cube.position.set(x, 0, y);
             cube.userData.squareNumber = number;   
             number++;
            chessBoard.add(cube);
        }
    }
}

function addToScean() {
    scene.add(camera);
    scene.add(light);
    scene.add(chessBoard);     

    scene.add(White);
    scene.add(Black)
}

function HoverAndReset(){
    resetMaterials(Black);
    hoverPieces(Black);
    resetMaterials(White);
    hoverPieces(White );
}
function movePices(targetSquare ){
    
    if(selectedPice.name==="whitePawn")
         {  //
            //intially two block move possible
            if(selectedPice.position.z===6 && targetSquare.z<=4 && (targetSquare.x===selectedPice.position.x)){
                selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)

            }else if(targetSquare.z===(selectedPice.position.z -1)){
                //only one block and can kill crossword
                selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
            }else{
                console.log("cant move")

            }

        }
    else   if(selectedPice.name==="blackPawn")
    {  //
       //intially two block move possible
       if(selectedPice.position.z===1 && targetSquare.z<=3 && (targetSquare.x===selectedPice.position.x)){
           selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)

       }else if(targetSquare.z===(selectedPice.position.z +1)){
           //only one block and can kill crossword
           selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
       }else{
           console.log("cant move")

       }

   }else if(selectedPice.name==="whiteKnight"){
       //knight moves 

       console.log("target", targetSquare)
       console.log("Pice",selectedPice.position)
        // possible locations
        //letf z-1 &&  x-2 || z-2 && x-1
        //right z+1 &&  x+2 || z+2 && x+1
        if( (targetSquare.z=== selectedPice.position.z-2 && targetSquare.x===selectedPice.position.x-1 ) || (targetSquare.z=== selectedPice.position.z-1 && targetSquare.x===selectedPice.position.x-2 ) ){
                console.log("Correctly moved")
                selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
        }else if( (targetSquare.z=== selectedPice.position.z-2 && targetSquare.x===selectedPice.position.x+1 ) || (targetSquare.z=== selectedPice.position.z-1 && targetSquare.x===selectedPice.position.x+2 ) ){
            console.log("Correctly moved to right")
            selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
        }else if( (targetSquare.z=== selectedPice.position.z+2 && targetSquare.x===selectedPice.position.x-1 ) || (targetSquare.z=== selectedPice.position.z+1 && targetSquare.x===selectedPice.position.x-2 ) ){
            console.log("Correctly moved")
            selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
    }else if( (targetSquare.z=== selectedPice.position.z+2 && targetSquare.x===selectedPice.position.x+1 ) || (targetSquare.z=== selectedPice.position.z+1 && targetSquare.x===selectedPice.position.x+2 ) ){
        console.log("Correctly moved to right")
        selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
    }


    
  }
    
    
    
    else if(selectedPice.name ==="blackKnight"){


        console.log("Black Knight")

           // possible locations
        //letf z-1 &&  x-2 || z-2 && x-1
        //right z+1 &&  x+2 || z+2 && x+1
        if( (targetSquare.z=== selectedPice.position.z-2 && targetSquare.x===selectedPice.position.x-1 ) || (targetSquare.z=== selectedPice.position.z-1 && targetSquare.x===selectedPice.position.x-2 ) ){
           
            selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
        }else if( (targetSquare.z=== selectedPice.position.z-2 && targetSquare.x===selectedPice.position.x+1 ) || (targetSquare.z=== selectedPice.position.z-1 && targetSquare.x===selectedPice.position.x+2 ) ){
        
            selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
        }else if( (targetSquare.z=== selectedPice.position.z+2 && targetSquare.x===selectedPice.position.x-1 ) || (targetSquare.z=== selectedPice.position.z+1 && targetSquare.x===selectedPice.position.x-2 ) ){
   
            selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
        }else if( (targetSquare.z=== selectedPice.position.z+2 && targetSquare.x===selectedPice.position.x+1 ) || (targetSquare.z=== selectedPice.position.z+1 && targetSquare.x===selectedPice.position.x+2 ) ){
  
          selectedPice.position.set(targetSquare.x,selectedPice.position.y,targetSquare.z)
        }

    }else if(selectedPice.name==="whiteRook"){
        console.log("White   Rook")
    }else if(selectedPice.name ==="blackRook"){
        console.log("Black Rook")
    }else if(selectedPice.name==="whiteBishop"){
        console.log("White   Bishop")
    }else if(selectedPice.name ==="blackBishop"){
        console.log("Black Bishop")
    }else if(selectedPice.name==="whiteQueen"){
        console.log("White   Queen")
    }else if(selectedPice.name ==="blackQueen"){
        console.log("Black Queen")
    }else if(selectedPice.name==="whiteKing"){
        console.log("White   King")
    }else if(selectedPice.name ==="blackKing"){
        console.log("Black King")
    }

    //
    return
}

function animate() {
    
    controls.update();
 HoverAndReset();
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};
 

createChessBoard();
//loading pawn 
loadPawnObject();
//loading king
loadKingobject();
//loading queen
loadQueenobject();
//loading rook
loadRookobject();
//load bishop
loadBishopobject();
// load knight
loadKnightbject();

addToScean();


animate();
