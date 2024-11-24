import React from "react"

export type TsignForm = {
    username: string,
    password: string,
    rpassword: string,
    image: FileList
}

export type TloginForm = {
    username: string,
    password: string
}

export type Tuser = {
    id: number,
    username: string,
    password: string,
    img_src: string,
    token: string,
    card?: string
}

export type TsidebarItems = {
    id: number,
    title: string,
    icon: string,
    value: number,
    component: React.ComponentType<any>
}

export type TcreateReceiptForm = {
    total_amount: string,
    image_url: FileList,
    description: string
}

export type Treceipts = {
    id: number,
    user_id: number,
    total_amount: number,
    image_url: string,
    description: string,
    created_at: number,
    is_done: number
}

export type Tcontributors = {
    receipt_id: number,
    user_id: number,
}


export type TwatingReceipts = {
    id: number,
    description: string,
    created_at: number,
    image_url: string
    is_paid: number,
    total_amount: number,
    user_id: number,
    username: string,
    img_src: string
}

export type TpaymentForm = {
    amount: number,
    receipt_image: FileList
}


export type Tpayers = {
    payment_id: number,
    amount: number,
    payment_date: number,
    receipt_image: string,
    user_id: number,
    receipt_id: number,
    username: string,
    profile: string,
    contributor_id: number,
    is_paid:number
}


export type Tcontributes = {
    id:number,
    is_paid:number,
    receipt_id:number,
    contributation_amount:number,
    user_id:number
}