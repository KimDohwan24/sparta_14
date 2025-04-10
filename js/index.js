// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { collection, addDoc, getFirestore, doc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDVNg9S9Wfb5A5A-Lxjs_JXSjT4MdAey8c",
    authDomain: "sparta-27fcb.firebaseapp.com",
    projectId: "sparta-27fcb",
    storageBucket: "sparta-27fcb.firebasestorage.app",
    messagingSenderId: "572292667368",
    appId: "1:572292667368:web:22fcc27db0fa8526bd365d",
    measurementId: "G-VJTVCHR7TZ"
};


// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 맴버추가 토글( 보이게 안보이게 )
$("#postingbtn").click(async function () {
    $('#postingbox').toggle();
})

$("#delete").click(async function () {
    $('#delbox').toggle();
})

// 카드 추가하기 누르면 DB에 전송
$("#addbtn").click(async function () {
    let image = $('#image').val();
    let name = $('#name').val();
    let gender = $('#gender').val();
    let comment = $('#comment').val();

    let doc = {
        'name': name,
        'image': image,
        'gender': gender,
        'comment': comment
    };

    await addDoc(collection(db, "member"), doc);
    alert('저장완료!')
    window.location.reload();
})

// 카드 정보 받아서 제작
let docs = await getDocs(collection(db, "member"));
docs.forEach((doc) => {
    let row = doc.data();
    console.log(row);

    let image = row['image'];
    let name = row['name'];
    let gender = row['gender'];
    let comment = row['comment'];

    let temp_html = `
            <div class="card h-100">
                    <img id="" src="${image}" class="card-img-top"
                        alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p>${comment}</p>
                        <p>${gender} </p>
                    </div>
                </div>`;
    $('#card').append(temp_html);
});

// 맴버 삭제 버튼
$("#delbtn").click(async function () {
    let delname = $('#delname').val();
    let docs = await getDocs(collection(db, "member"));
    docs.forEach(a => {
        let row = a.data();
        let name = row['name'];

        if (delname === name) {
            deleteDoc(doc(db, "member", a.id));
        }

    });
    alert('삭제되었습니다!')
})