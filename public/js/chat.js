const input_email = document.getElementById("input-group-1");
const cont_addfriend = document.getElementById("container_addfriend");
const form_addfriend = document.getElementById("form_addfriend");
const form_requestfriend = document.getElementById("form_requestfriend");
const form_options_user = document.getElementById("options_user");
const form_panel_message = document.getElementById("panel_message");

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

function renderchat(chat) {
  const nav = document.createElement("nav");
  nav;
  form_panel_message.innerHTML += `
  <nav class="rounded-xl bg-white border-gray-200 dark:bg-gray-900">
          <div class="flex flex-wrap items-center p-4">
            <a href="" class="flex items-center grow">
              <div class="relative pr-3">
                <img class="w-10 h-10 rounded-full" src="${chat.members[0].user.img}" alt="" />
                <span class="top-0 left-7 absolute w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
              <span class="self-center text-xl whitespace-nowrap dark:text-white">${chat.members[0].user.username}</span>
            </a>
            <div class="flex items-center grow">
              <a href="tel:5541251234" class="mr-6 text-sm text-gray-500 dark:text-white hover:underline">TEST</a>
              <a href="#" class="text-sm text-blue-600 dark:text-blue-500 hover:underline">TEST</a>
            </div>
          </div>
    </nav>
    <div class="flex flex-col h-full overflow-x-auto mb-4">
          <div class="flex flex-col h-full">
            <div class="grid grid-cols-12 gap-y-2">
              <div class="col-start-1 col-end-8 p-3 rounded-lg">
                <div class="flex flex-row items-center">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>
                      Hey How are you today?
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-start-6 col-end-13 p-3 rounded-lg">
                <div class="flex items-center justify-start flex-row-reverse">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>
                      I'm ok what about you?
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-start-6 col-end-13 p-3 rounded-lg">
                <div class="flex items-center justify-start flex-row-reverse">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                    <div>
                      Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-start-1 col-end-8 p-3 rounded-lg">
                <div class="flex flex-row items-center">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                  </div>
                  <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                    <div>Lorem ipsum dolor sit amet !</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div>
          <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
            </svg>
          </button>
        </div>
        <div class="flex-grow ml-4">
          <div class="relative w-full">
            <input type="text" placeholder="Escribe un mensaje" class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
            <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="ml-4">
          <button type="submit" class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
            <span>Send</span>
            <span class="ml-2">
              <svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
  `;
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
      renderchat(render);
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
  console.log("Message");
});
