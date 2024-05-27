export interface IUser {
    user_id:      number | string;
    username:     string;
    user_email:   string;
    user_gender:  string | null;
    user_country: string | null;
    user_city:    string | null;
    user_age:     number | string | null;
    password : string | null;
}
