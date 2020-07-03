const apiUrl = "https://rest-crud-api.herokuapp.com/api/members";

var div = document.getElementById('list');

function getUsersFromApi(){
	fetch(apiUrl)
	.then((res)=>  res.json())
	.then((data)=>{
		//console.log(data)
		let users = "<h2>Users</h2>"
		data.forEach((user)=>{
			users+=`
				<ul>
					<li>ID-${user.id}</li>
					<li>NAME-${user.name}</li>
					<li>EMAIL-${user.email}</li>
				</ul>
			`
		})
		div.innerHTML = users;
	})
}
getUsersFromApi()

//data submition to api


//grab button for submit data
document.getElementById('submit').addEventListener('click',addNewUser)

//initialize addNewUser function

function addNewUser(){
	//grab name
	var name = document.getElementById('name');
	//grab email
	var email = document.getElementById('email');

	//call fetch method
	fetch(apiUrl,{
		method:'POST', //we have to define which method we are using
		headers:{
			'Content-Type':'application/json'   //we are submitting json data so specified it in content
		},
		body:JSON.stringify({
			name:name.value, // we have to pass name in body
			email:email.value //same as above 
			//we have to convert it into json so api can accept it.
		})
	})
	.then((res)=>res.json())
	.then((data)=>{console.log(data)
		getUsersFromApi();
	});
	name.value = "";
	email.value = ""
}

