const input_email = document.getElementById("input-group-1");
const cont_addfriend = document.getElementById("container_addfriend");
const form_addfriend = document.getElementById("form_addfriend");
const form_requestfriend = document.getElementById("form_requestfriend");
const form_options_user = document.getElementById("options_user");
const form_panel_message = document.getElementById("panel_message");
const input_message = document.getElementById("input_message_chat");
const cont_message = document.getElementById("message_cont");

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
  console.log(data);
}

async function acceptrequest(id) {
  let response = await fetch("http://localhost:8080/api/friends/solicitude/accept", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idfriend: id }),
  });
  let data = await response.json();
  console.log(data);
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

async function sendMsg(idfriend, chatid, msg) {
  let response = await fetch("http://localhost:8080/api/chat/postmsg", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idfriend: idfriend, chatid: chatid, msg: msg }),
  });
  let data = await response.json();
  return data;
}

function rendermsg(chat, receiver) {}

async function renderchat(chat) {
  let [sender, receiver] = chat.members;

  const deletenav = form_panel_message.querySelector("nav");
  if (deletenav) form_panel_message.removeChild(deletenav);

  form_panel_message.innerHTML += `
    <nav class="rounded-xl bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap items-center p-4">
        <button type="submit" name=${chat.id} id=${receiver.receiver.id} href="" class="flex items-center grow">
          <div class="relative pr-3">
            <img class="w-10 h-10 rounded-full" src="${receiver.receiver.img}" alt="" />
            <span class="top-0 left-7 absolute w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          <span class="self-center text-xl whitespace-nowrap dark:text-white">${receiver.receiver.username}</span>
        </button>
        <div class="flex items-center grow">
          <a href="tel:5541251234" class="mr-6 text-sm text-gray-500 dark:text-white hover:underline">TEST</a>
          <a href="#" class="text-sm text-blue-600 dark:text-blue-500 hover:underline">TEST</a>
        </div>
      </div>
    </nav>
  `;

  rendermsg(chat, receiver.receiver.id);
}

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

form_requestfriend.addEventListener("submit", async (e) => {
  e.preventDefault();

  let btn = e.submitter.id;
  let id = e.submitter.name;

  if (e.submitter.id == "accept") {
    acceptrequest(id);
  } else {
    declinerequest(id);
  }
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
  }
});
