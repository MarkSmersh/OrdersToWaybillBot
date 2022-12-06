import { QueryCreate, QueryEdit } from "../types/order";

export function queryWebAppConstructor
    <M extends keyof QueryHelper>
    (
        method: M,
        data: QueryHelper[M]
    ): string
{
    let props = {} as {[x in string]: string};

    Object.keys(data).map((k) => {
        props[k] = JSON.stringify(data[k as keyof QueryHelper[M]])
    })

    return `/${method.toString()}?${new URLSearchParams(props)}`;
}

interface QueryHelper {
    create: QueryCreate,
    edit: QueryEdit
}

