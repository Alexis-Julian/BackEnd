async function newFriend(idfriend) {
  let a = await fetch('http://localhost:8080/api/friends/add', {
    method: 'POST',
    body: JSON.stringify(idfriend),
  });
  let data = await a.json();
  console.log(data);
}
