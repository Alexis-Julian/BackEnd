const input_email = document.getElementById("input-group-1");
const cont_addfriend = document.getElementById("container_addfriend");
const form_addfriend = document.getElementById("form_addfriend");
const form_requestfriend = document.getElementById("form_requestfriend");
const form_options_user = document.getElementById("options_user");
const form_panel_message = document.getElementById("panel_message");
const input_message = document.getElementById("input_message_chat");
const cont_message = document.getElementById("message_cont");
const cont_message_scroll = document.getElementById("cont_message_scroll");
const panel_message_view = document.getElementById("panel_message_view");
const panel_request_petitions = document.getElementById("request_petitions");
const btn_request_petitions = document.getElementById("btn_request_petitions");
const socket = io();
let chatactive = 0;
/* ------------------------------------------------Sockets----------------------------- */
socket.on("SocketId", (id) => {
  console.log("Bienvenido usuario: " + id);

  socket.on(`${id}:message`, (data) => {
    console.log("Nuevo mensaje!");

    let info = form_panel_message.querySelector("nav").querySelector("button")["name"];

    if (chatactive == info) {
      cont_message.innerHTML += receivermsg(data.sender, data.body);
      scrollHeight(cont_message_scroll, cont_message_scroll.scrollHeight);
    }
  });

  socket.on(`${id}:solicitud`, (data) => {
    console.log("Nueva solicitud!");
  });

  socket.on(`${id}:active`, (data) => {
    console.log("Chat Active!: " + data);
    chatactive = data;
  });
});

/* --------------------------------------------------Fetchs--------------------------- */

async function newFriend(idfriend) {
  let a = await fetch("http://localhost:8080/api/friends/add", {
    method: "POST",
    body: JSON.stringify(idfriend),
  });
  let data = await a.json();
  console.log(data);
}

async function declinerequest(id) {
  let response = await fetch("http://localhost:8080/api/friends/solicitude/decline", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idfriend: id }),
  });
  let data = await response.json();
  return data;
}

async function acceptrequest(id) {
  let response = await fetch("http://localhost:8080/api/friends/solicitude/accept", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idfriend: id }),
  });
  let data = await response.json();
  return data;
}

async function getChat(chat) {
  let response = await fetch(`http://localhost:8080/api/chat/${chat}`);
  let data = await response.json();
  return data.result;
}

async function getchatid(idfriend) {
  let response = await fetch("http://localhost:8080/api/chat/createchat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idfriend: idfriend }),
  });
  let data = await response.json();
  return data.result.idchat;
}

async function getRequestFriend() {
  let response = await fetch("http://localhost:8080/api/friends/search/request");
  let data = await response.json();
  return data;
}

/*  --------------------------------------UI--------------------------------*/

function userfriend(user) {
  return `  
      <hr/>
      <li class='flex justify-between gap-x-6 py-5 bg-white hover:bg-gray-50 rounded-lg'>
          <div class='flex gap-x-4 pl-2'>
              <img class='h-12 w-12 flex-none rounded-full bg-gray-50' src='${user.img ? user.img : " https://i.imgur.com/9zz7ubU.jpg"}' alt='' />
              <div class='min-w-0 flex-auto'>
                  <p class='text-sm font-semibold leading-6 text-gray-900'>${user.username}</p>
                  <p class='mt-1 truncate text-xs leading-5 text-gray-500'>${user.email}</p>
              </div>
          </div>
          <div>
              <button type="submit" name="${
                user._id
              }" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Agregar</button>
          </div>
  
      </li>`;
}

function sendermsg(sender, body) {
  return `<div class="col-start-1 col-end-8 p-3 rounded-lg">
  <div class="flex flex-row items-center justify-end ">
    
    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
      <div>
        ${body}
      </div>
    </div>
    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
      <img class="rounded-full" src="${sender.img}" alt="">
    </div>
  </div>`;
}

function receivermsg(receiver, body) {
  return `<div class="col-start-6 col-end-13 p-3 rounded-lg">
      <div class="flex items-center justify-start flex-row-reverse">
        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          <img class="rounded-full" src="${receiver.img}" alt="">
        </div>
        <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>
            ${body}
          </div>
        </div>
      </div>
    </div>`;
}

function requestfriend(user) {
  return `
  <hr />
  <li name="${user._id}" class="flex justify-between gap-x-6 py-5 bg-white hover:bg-gray-50 rounded-lg">
    <div class="flex gap-x-4 pl-2">
      <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="${user.img}" />
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">${user.username}</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">${user.email}</p>
      </div>
    </div>
    <button
      type="submit"
      class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      name="${user._id}"
      id="accept"
    >Aceptar</button>
    <button
      name="${user._id}"
      type="submit"
      id="decline"
      class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >Rechazar</button>
  </li>
  `;
}

/* ---------------------------------------------Funciones incompletas---------------------------- */

async function sendMsg(idfriend, chatid, msg) {
  let response = await fetch("http://localhost:8080/api/chat/postmsg", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idfriend: idfriend, chatid: chatid, msg: msg }),
  });
  let data = await response.json();
  return data;
}

function rendermsg(chat) {
  let { sender, receiver } = chat.members;
  console.log(chat);
  chat.chat.forEach((element) => {
    if (element.sender == chat.members.sender.id) {
      cont_message.innerHTML += sendermsg(sender, element.body);
    } else {
      cont_message.innerHTML += receivermsg(receiver, element.body);
    }
  });
}

function scrollHeight(node, scrollY) {
  node.scrollTop = scrollY;
}

async function renderchat(chat) {
  let { sender, receiver } = chat.members;

  cont_message.innerHTML = "";

  const panel_message = form_panel_message.querySelector("nav");

  const button = panel_message.querySelector("button");

  const img_receiver = panel_message.querySelector("img");

  const name_receiver = panel_message.querySelector("h4");

  img_receiver.src = `${receiver.img}`;

  button.setAttribute("name", chat.id);

  button.id = receiver.id;

  name_receiver.innerHTML = receiver.username;

  panel_message_view.remove();

  form_panel_message.classList.remove("hidden");

  rendermsg(chat, receiver.id);

  scrollHeight(cont_message_scroll, cont_message_scroll.scrollHeight);
}

/*------------------------------ Events----------------------------------------------- */

input_email.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    let response = await fetch("http://localhost:8080/api/friends/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: e.target.value }),
    });
    let data = await response.json();
    if (data.result.length > 0) {
      data.result.forEach((e) => {
        cont_addfriend.innerHTML += userfriend(e);
      });
    }
  }
});

form_addfriend.addEventListener("submit", async (e) => {
  e.preventDefault();

  let iduser = { reqfriend: e.submitter.name };

  let response = await fetch("http://localhost:8080/api/friends/solicitude/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(iduser),
  });
  let data = await response.json();
  console.log(data);
});

form_options_user.addEventListener("submit", async (e) => {
  e.preventDefault();
  const option = e.submitter.name;
  const id = e.submitter.id;
  switch (option) {
    case "enter_chat":
      let chatid = await getchatid(id);
      let render = await getChat(chatid);
      await renderchat(render);
      break;
    case "clear_chat":
      console.log(2);
      break;
    case "dlt_friend":
      console.log(3);
      break;
    default:
      break;
  }
});

form_panel_message.addEventListener("submit", async (e) => {
  e.preventDefault();
  let info = form_panel_message.querySelector("nav").querySelector("button");

  let chatid = info.name;

  let idfriend = info.id;

  let msg = e.target["msg"].value;

  if (info && idfriend && chatid) {
    let data = await sendMsg(idfriend, chatid, msg);
    if (data) {
      cont_message.innerHTML += sendermsg(data.result.sender, data.result.body);
      scrollHeight(cont_message_scroll, cont_message_scroll.scrollHeight);
    }
  }

  e.target["msg"].value = "";
});

btn_request_petitions.addEventListener("click", async (e) => {
  let ul = panel_request_petitions.querySelector("#container_requestfriend");
  ul.innerHTML = " ";
  let request_friends = await getRequestFriend();
  if (request_friends.status == "success") {
    if (request_friends.result.length > 0) {
      request_friends.result.map((user) => {
        ul.innerHTML += requestfriend(user.user);
      });
    } else {
      let h3 = document.createElement("h3");
      let flexcenter = ["text-center", "w-full", "mt-3", "text-2xl"];
      h3.classList.add(...flexcenter);
      h3.innerHTML = "Yo have no friends requests";
      ul.appendChild(h3);
    }
  }
});

form_requestfriend.addEventListener("submit", async (e) => {
  e.preventDefault();

  let btn = e.submitter.id;
  let id = e.submitter.name;
  let li = e.submitter.previousSibling.parentNode;

  switch (btn) {
    case "accept":
      let result_1 = await acceptrequest(id);
      if (result_1.status === "success") return li.remove();
      break;
    case "decline":
      let result_2 = await declinerequest(id);
      if (result_2.status === "success") return li.remove();
      break;
  }
});
