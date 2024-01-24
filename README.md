# PETApi

PETApi is an API created to help managing and storing PET-SIMC related information.<br>
Uses MongoDB as main form of storage.


<h1>Features:</h1>

<ul>
    <li>Member Route - Services: Register, Search, Update, Remove</li>
    <li>Projects Route - Services: Register, Search, Update, Remove</li>
    <li>Tutor Route - Services: Register, Search, Update, Remove</li>
    <li>News Route - Services: Register, Search, Update, Remove</li>
</ul>

-----

<h3>Member Route</h3>
Using the "/member" route you can register, search, update or remove a PET-SIMC member/ex-member, using the methods POST, GET, PUT, DELETE respectively.<br>
All members are identifiable by matricula and uses the following model.<br><br>


```bash
{
		name: "John Doe",
		matricula": "00000BSI000",
		photo: "photo_url",
		hobby: "Reading",
		place_of_birth: "",
		admission_year: 2000,
		course_curriculum: 2000,
		email: "----@ufu.br",
		instagram_url: "https://www.instagram.com/----",
		github_url : "https://github.com/----",
		linkedin_url: "https://www.linkedin.com/in/----",
		lattes_url: "https://lattes.cnpq.br/----",
		spotify_track_url: "https://open.spotify.com/track/----",
		status: "Membro" | "Ex-Membro",
		projects: [ "project_1", "project_2", ... ]
}
```
-----

<h3>Project Route</h3>
Using the "/project" route you can register, search, update or remove a PET-SIMC project, using the methods POST, GET, PUT, DELETE respectively.<br>
All projects are identifiable by name and uses the following model.<br><br> 

```bash
{
		name: "John Does",
		subtitle: "John's Makings",
		description: "All of John's makings on his life",
		photo: "photo_url",
		status: "Em Andamento" | "Concluído",
		type: "Extensão" | "Pesquisa" | "Ensino" | "Outros" 
}
``` 
-----

<h3>Tutor Route</h3>
Using the "/tutor" route you can register, search, update or remove a PET-SIMC tutor/ex-tutor, using the methods POST, GET, PUT, DELETE respectively.<br> 
All members are identifiable by name and uses the following model.<br><br>

```bash
{
		name: "John Doe",
		photo: "photo_url",
		admission_year: 2000,
		area: "",
		email: "------@ufu.br",
		place_of_birth: "",
		area: "",
		instagram_url: "https://www.instagram.com/----",
		github_url : "https://github.com/----",
		linkedin_url: "https://www.linkedin.com/in/----",
		lattes_url: "https://lattes.cnpq.br/----",
		status: "Tutor" | "Ex-Tutor",
		disciplines: [ "ministered_discipline_1", "ministered_discipline_2", ... ]
}
```
-----

<h3>News Route</h3>
Using the "/news" route you can register, search, update or remove a news article relevant to PET-SIMC, using the methods POST, GET, PUT, DELETE respectively.<br> 
All news are identifiable by name and uses the following model.<br><br> 

```bash
{
		id: "john-did",
		name: "John Did",
		content: "John did it early this morning",
		photo: "photo_url"
}
```

-----

<h1>Instructions</h1>

<ul><h3>Requirements:</h3> 
    <li>MongoDB</li>
</ul>


Create a MongoDB Database app in (https://www.mongodb.com) and insert it's credentials into .env as show in .env.example.<br>

After setting up, you can start the project with: 

```bash
npm install
npm run dev
```
