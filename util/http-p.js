
import { config } from "../config.js"

const tips = {
    1: '抱歉呢，出现了一个错误',
    1005: 'appkey无效',
    3000: '期刊不存在'
}

class HTTP
{
    request ( { url, data = {}, method = 'GET' } )
    {
        return new Promise( ( resolve, reject ) =>
        {
            //xie  yi bu daima 
            this._request( url, resolve, reject, data, method )
        } )
    }

    _request ( url, resolve, reject, data = {}, method = 'GET' )
    {
        wx.request( {
            url: config.api_base_url + url,
            data: data,
            method: method,
            header: {
                'content-type': "application/json"
                , 'appkey': config.appkey
            },
            success: ( res ) =>
            {
                const code = res.statusCode.toString()
                if ( code.startsWith( '2' ) )
                {
                    resolve( res.data )
                } else
                {
                    reject()
                    const error_code = res.data.error_code
                    this._show_error( error_code )
                }

            },
            fail: ( err ) =>
            {
                reject()
                this._show_error( 1 );
            }
        } )
    }
    _show_error ( error_code )
    {

        if ( !error_code )
        {
            error_code = 1;
        }
        //zeng qiang jian zhuangxing panduan 
        const tip = tips[ error_code ];
        wx.showToast( {
            title: tip ? tip : tips[ 1 ],
            icon: "none",
            duration: 2000
        } )
    }

}

export { HTTP }