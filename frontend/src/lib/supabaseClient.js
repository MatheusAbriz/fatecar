//Arquivo responsável pela conexão do banco de dados supabase com a aplicação vue
import { createClient } from "@supabase/supabase-js";

//Pegando a URL do projeto e a chave da API do supabase
export const supabase = createClient('https://qnmtccqlagouvoxloevj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubXRjY3FsYWdvdXZveGxvZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4MjA5MzMsImV4cCI6MjA0MzM5NjkzM30.VkOCA_01P2QMNH1j8l1-9pWaoAdNS14OpwBDBky3QPc');

