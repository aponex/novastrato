export type TUser = {
    name: string;
    email: string;
    profilePic: string;
    uid: string;
};

export type TFile ={
    fileName: string;
    size: number;
    type: string;
    uid: string;
    downloadUrl: string;
    timestamp: Date;
    id: string;
}