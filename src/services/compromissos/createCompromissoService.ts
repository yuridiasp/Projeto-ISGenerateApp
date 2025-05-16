import dotEnv from "dotenv"
import { AxiosResponse } from "axios"

import { loggedPostRequest } from "../../utils/request/postRequest"
import { iCompromissoBody } from "../../models/compromisso/iCompromissoBody"
import { Result } from "../../models/result/result"
import { SessionExpiredError } from "src/models/errors/sessionExpiredError"
import { isSessionExpired } from "src/utils/auth/checkSessionExpiration"

dotEnv.config()

type idCompromisso = { id: string }

export function getCompromissoCreatedId(url: string) {

    const regex = /idCO=(\d+)/

    const result = regex.exec(url)

    if(result) {
        return regex.exec(url)[1]
    }

    return null
}

export function isCompromissoSuccessfullyCreated(response: AxiosResponse<any, any>): Result<idCompromisso> {
    const url = response.request.res.responseUrl

    if (url.includes("http://fabioribeiro.eastus.cloudapp.azure.com/adv/tarefas/formulario")) {
        return {
            success: true,
            data: { id: getCompromissoCreatedId(url) }
        }
    }

    const expiredError = isSessionExpired(url)

    if (expiredError) {
        return {
            success: false,
            error: expiredError
        }
    }

    return {
        success: false,
        error: new SessionExpiredError()
    }
}

export async function createCompromisso(body: iCompromissoBody, cookie: string) {

    const { URL_CREATE_COMPROMISSO_SISTEMFR } = process.env

    const result = await loggedPostRequest({ url: URL_CREATE_COMPROMISSO_SISTEMFR, body, cookie })
    
    return isCompromissoSuccessfullyCreated(result)
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