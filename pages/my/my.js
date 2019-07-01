import { BookModel } from "../../models/book";
import { ClassicModel } from "../../models/classic";
let bookModel = new BookModel()
let classicModel = new ClassicModel();


Page( {

    data: {
        authorized: false,
        userInfo: null,
        bookCount: 0,
        classics: null
    },
    onLoad ( options )
    {
        // xin ban  de xiaochengxu  zhi you yonghu shouqiang l   cai hui you getuserinfo
        // wx.getUserInfo( {
        //     success: function ( res )
        //     {
        //         //  console.log( res );

        //     },
        //     fail: function ()
        //     {

        //     },
        //     complete: function ()
        //     {
        //         // complete
        //     }
        // } )
        this.userAuthorized()
        this.getMyBookCount()
        this.getMyFavor()
    },
    getMyBookCount ()
    {
        bookModel.getMyBookCount()
            .then( res =>
            {
                this.setData( {
                    bookCount: res.count
                } )
            } )

    },
    getMyFavor ()
    {
        classicModel.getMyFavor( res =>
        {
            this.setData( {
                classics: res
            } )
        } )

        console.log( this.data.classics );

    },
    getUserNewInfo ( e )
    {
        //  console.log( e );


    },
    onGetUserInfo ( e )
    {
        const userInfo = e.detail.userInfo
        if ( userInfo )
        {
            this.setData( {
                userInfo,
                authorized: true
            } )
        }

    },
    userAuthorized ()
    {
        wx.getSetting( {
            success: data =>
            {
                if ( data.authSetting[ 'scope.userInfo' ] )
                {
                    wx.getUserInfo( {
                        success: data =>
                        {
                            this.setData( {
                                authorized: true
                                ,
                                userInfo: data.userInfo
                            } )
                        }
                    } )
                } else
                {
                    console.log( 'error' );

                }
            }
        } )
    },


    onJumpToAbout ( e )
    {
        wx.navigateTo( {
            url: '/pages/about/about',
            success: function ( res )
            {
                // success
                console.log( res );

            },
            fail: function ()
            {
                // fail
            },
            complete: function ( e )
            {
                // complete


            }
        } )
    },
    onStudy ( e )
    {
        wx.navigateTo( {
            url: '/pages/course/course',
            success: function ( res )
            {
                // success
            },
            fail: function ()
            {
                // fail
            },
            complete: function ()
            {
                // complete
            }
        } )
    }

} )