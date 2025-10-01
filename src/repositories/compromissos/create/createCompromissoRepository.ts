import dotEnv from "dotenv"

import { loggedPostRequest } from "@utils/request/postRequest"
import { iCompromissoBody } from "@models/compromissos"

dotEnv.config()

export async function createCompromissoRepository(body: iCompromissoBody, cookie: string) {

    const { URL_CREATE_COMPROMISSO_SISTEMFR } = process.env

    const result = await loggedPostRequest({ url: URL_CREATE_COMPROMISSO_SISTEMFR, body, cookie })
    
    return result
}

/* Quando dados são faltantes: Reponse
    <div class="aviso">Dados inválidos para continuar com a operação. Verifique todos os campos informados e tente novamente. Em caso de dúvidas, entre em contato com o administrador.</div>
    <script type="text/javascript">
        alert("Dados inválidos para continuar com a operação. Verifique todos os campos informados e tente novamente. Em caso de dúvidas, entre em contato com o administrador.");
    </script>

    <script type="text/javascript">
        history.back();
    </script>
*/

/* Quando o sistema desloga: URL
    http://fabioribeiro.eastus.cloudapp.azure.com/?m=t
 */