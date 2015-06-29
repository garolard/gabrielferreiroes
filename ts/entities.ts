module Entities {

    export interface Stats {
        private_snipts: number;
        public_snipts: number;
        total_snipts: number;
        total_views: number;
    }

    export interface User {
        absolute_url: string;
        email: string;
        email_md5: string;
        id: number;
        is_pro: boolean;
        lexers: string[];
        profile: string;
        resource_uri: string;
        stats: Stats;
        username: string;
    }

    export interface Snipt {
        absolute_url: string;
        blog_post: boolean;
        code: string;
        created: Date;
        description: string;
        description_rendered: string;
        embed_url: string;
        favs: number;
        full_absolute_url: string;
        id: number;
        key: string;
        lexer: string;
        line_count: number;
        meta: string;
        modified: Date;
        public: boolean;
        publish_date?: any;
        raw_url: string;
        resource_uri: string;
        slug: string;
        stylized: string;
        tags_list: string;
        title: string;
        user: User;
        views: number;
    }

}