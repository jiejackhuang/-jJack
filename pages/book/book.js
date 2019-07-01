import { BookModel } from "../../models/book";
import { random } from "../../util/common";

// pages/classic/classic.js
const bookModel = new BookModel();

Page( {

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        searching: false,
        more: 'suiji zifu chuan shengcheng hanshu'
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function ( options )
    {
        const hotList = bookModel.getHotList();
        hotList.then( ( res ) =>
        {
            this.setData( {
                books: res
            } )

        }, ( error ) =>
            {

            } )
    },
    onSearching ( event )
    {
        this.setData( {
            searching: true
        } )
    },
    onCancel ( event )
    {
        this.setData( {
            searching: false
        } )
    },
    onReachBottom ()
    {
        this.setData( {
            more: random( 16 )
        } )

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function ()
    {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function ()
    {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function ()
    {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function ()
    {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function ()
    {

    },

    /**
     * 页面上拉触底事件的处理函数
     */

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function ()
    {

    }
} )