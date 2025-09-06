export type User = {
	id:number;
	username:string;
    is_active?:boolean;
}

export type Zoe = {
    id:number;
    is_active?:boolean;
    name:String;
    nickname?:String;
    user_nickname?:String;
}

export type Room = {
    id:number;
    uuid:string;
    name:string;
    type_room:string;
    is_active?:boolean;
}

export type RoomUser = {
    id:number;
    id_user:number;
    id_room:number;
    id_zoe:number;

    is_active?:boolean;

    room?:Room
    user?:User
    zoe?:Zoe
}

export type Message = {
    id?:number;
    content:String;
    is_active?:boolean;
    created_at?:Date;
    user?:User;
    zoe?:Zoe;
}