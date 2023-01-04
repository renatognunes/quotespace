export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      all_authors: {
        Row: {
          id: number;
          created_at: string | null;
          name: string;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name: string;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string;
        };
      };
      all_books: {
        Row: {
          id: number;
          created_at: string | null;
          title: string;
          year: string | null;
          author_id: number;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          title: string;
          year?: string | null;
          author_id: number;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          title?: string;
          year?: string | null;
          author_id?: number;
        };
      };
      all_quotes: {
        Row: {
          id: number;
          created_at: string | null;
          quote: string;
          likes: number | null;
          shares: number | null;
          book_id: number;
          owner_id: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          quote: string;
          likes?: number | null;
          shares?: number | null;
          book_id: number;
          owner_id?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          quote?: string;
          likes?: number | null;
          shares?: number | null;
          book_id?: number;
          owner_id?: string | null;
        };
      };
      likes: {
        Row: {
          id: number;
          created_at: string | null;
          user_id: string | null;
          quote_id: number | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          user_id?: string | null;
          quote_id?: number | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          user_id?: string | null;
          quote_id?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type QuoteBookDetails = {
  all_books: {
    title: string;
  };
};

export type AllQuotes = Database["public"]["Tables"]["all_quotes"]["Row"] &
  QuoteBookDetails;

export type AllBooks = Pick<
  Database["public"]["Tables"]["all_books"]["Row"],
  "title" | "id"
>;
