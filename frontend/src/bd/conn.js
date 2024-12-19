//Criando conexao teste
import { createConnection, mysql2 } from 'mysql2'
const conn = createConnection({
    host: 'localhost',
    user: 'root',
    password: '0505823513',
    database: 'teste2'
})

export default conn