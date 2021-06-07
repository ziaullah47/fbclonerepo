export interface ISignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday: Date;
    gender: string;
}

export enum HTTPStatusEnum {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZE = 401,
    FORBIDDEN = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERRPR = 500,
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ITokenResponse {
    accessToken: string;
    expiresIn: number
}

export enum AlertVariant {
    PRIMARY = "alert alert-primary",
    SECONDARY = "alert alert-secondary",
    SUCCESS = "alert alert-success",
    INFO = "alert alert-info",
    WARNING = "alert alert-warning",
    DANGER = "alert alert-danger",
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
    coverPhoto: string;
}

export interface IPost {
    id: number;
    content: string;
    user: IUser
    totalLikes: number;
    isLiked: number;
    totalComments: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface IPostCreateRequest {
    content: string;
}

export interface IPostUpdateRequest {
    id: number;
    content: string;
}

export interface ICommentCreateRequest {
    postId: number;
    content: string;
    parentId?: number;
}

export interface ICommenUpdateRequest {
    id: number;
    content: string;
}

export interface IComment {
    id: number;
    content: string;
    postId: number;
    commentedBy: IUser;
    isLiked: boolean;
    totalLikes: number;
    totalReplies: number;
    replies: IComment[];
}

export interface IFriendAddRequest {
    fromId: number;
    toId: number;
}

export interface IIsMyFriendResponse {
    isFriend: boolean;
}

export interface IPagedMetaData {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
}
export interface IPagedList<T> extends IPagedMetaData {
    items: T[]
}