export class Member {
    name: string;
    photo: string;
    matricula: string;
    admission_year: number;
    email: string;
    github_url: string;
    instagram_url: string;
    linkedin_url: string;
    lattes_url: string;
    status: string;
    projects: string[] = [];

    constructor(name: string, photo: string, matricula: string, admission_year: number, email: string, github_url: string, instagram_url: string, linkedin_url: string, lattes_url: string, status: string, projects?: string[]) {
        this.name = name;
        this.photo = photo;
        this.matricula = matricula;
        this.admission_year = admission_year;
        this.email = email;
        this.github_url = github_url;
        this.instagram_url = instagram_url;
        this.linkedin_url = linkedin_url;
        this.lattes_url = lattes_url;
        this.status = status;
        if(projects) this.projects = projects;
    };
}

export class Project {
    name: string;
    type: string;
    photo: string;
    description: string;
    status: string;

    constructor(name: string, type: string, photo: string, description: string, status: string) {
        this.name = name;
        this.type = type;
        this.photo = photo;
        this.description = description;
        this.status = status;
    };
}