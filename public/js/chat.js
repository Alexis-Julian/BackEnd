const input_email = document.getElementById('input-group-1');
const cont_addfriend = document.getElementById('container_addfriend');
const form_addfriend = document.getElementById('form_addfriend');

async function newFriend(idfriend) {
  let a = await fetch('http://localhost:8080/api/friends/add', {
    method: 'POST',
    body: JSON.stringify(idfriend),
  });
  let data = await a.json();
  console.log(data);
}

input_email.addEventListener('keydown', async (e) => {
  if (e.keyCode === 13) {
    let response = await fetch('http://localhost:8080/api/friends/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

form_addfriend.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.submitter.name);
});

function userfriend(user) {
  return `  
    <hr/>
    <li class='flex justify-between gap-x-6 py-5 bg-white hover:bg-gray-50 rounded-lg'>
        <div class='flex gap-x-4 pl-2'>
            <img class='h-12 w-12 flex-none rounded-full bg-gray-50' src='${user.img ? user.img : ' https://i.imgur.com/9zz7ubU.jpg'}' alt='' />
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
