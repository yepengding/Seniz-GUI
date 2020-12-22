export interface ProjectFile {
    id?: number,
    name: string,
    size?: number,
    content: string,
    projectId: number
}

export interface Project {
    id?: number,
    name: string,
    description: string
}
