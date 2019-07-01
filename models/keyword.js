import { HTTP } from "../util/http-p";

class KeyWordModel extends HTTP
{
    key = "q"
    maxlength = 10
    getHistory ()
    {

        let words = wx.getStorageSync( this.key )
        if ( !words )
        {
            return []
        }
        return words


    }
    addToHistory ( keyword )
    {
        let words = this.getHistory()
        const has = words.includes( keyword )
        if ( !has )
        {
            const length = words.length;
            if ( length >= this.maxlength )
            {
                words.pop();
            }
            words.unshift( keyword )

            wx.setStorageSync( this.key, words )
        }
    }
    getHot ()
    {
        return this.request( {
            url: 'book/hot_keyword'
        } )

    }


}

export
{
    KeyWordModel
}