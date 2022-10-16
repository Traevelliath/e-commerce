export type CollectionObjects = {
    title: string,
}

export type AdditionalData = {
    displayName?: string
}

export type UserData = {
    createdAt: Date,
    displayName: string,
    email: string
}

export type SignUpData = {
    email: string,
    password: string,
    displayName: string
}