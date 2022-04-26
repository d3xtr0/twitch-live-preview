// ==UserScript==
// @name         Twitch Live Preview
// @namespace    https://github.com/d3xtr0/twitch-live-preview
// @version      1.3
// @description  Hover channels & clips for a preview
// @author       d3xtr0
// @match        https://www.twitch.tv/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var hovertimer;

    // game directory
    jQuery(document).on({
        mouseenter: function () {
            // clip preview
            hovertimer = setTimeout(function(){
                let streamname = jQuery(this).find("a.tw-link").attr("href");
                let iframesrc = "";
                if(streamname.indexOf("/clip/") >= 0){
                    let clipString = streamname.substring(
                        streamname.lastIndexOf("/clip/") + 6,
                        streamname.lastIndexOf("?") >= 0 ? streamname.lastIndexOf("?") : streamname.length
                    );
                    iframesrc = "https://clips.twitch.tv/embed?clip="+clipString+"&muted=true&controls=false&parent=twitch.tv&autoplay=true";
                }else{
                    iframesrc = "https://player.twitch.tv/?channel="+streamname.replace("/","")+"&muted=true&controls=false&parent=twitch.tv";
                }
                jQuery(this).find(".tw-aspect img").hide();
                jQuery(this).find(".tw-aspect").append("<iframe src='"+iframesrc+"' style='pointer-events: none;'>").append("<div id='preview-overlay-div' style='position:absolute;width:100%;height:100%;pointer-events: none;'></div>");
            }.bind(this), 500);

            // clips button
            if(!jQuery(this).closest("div[class^='Layout-sc']").find("a.clips-btn").length){
                var streamusernameurl = jQuery(this).closest("div[class^='Layout-sc']").find("a[data-a-target='preview-card-channel-link']").attr("href").split("/")[1];
                jQuery(this).closest("div[class^='Layout-sc']").find("a[data-a-target='preview-card-channel-link']").after("<a href='/"+streamusernameurl+"/clips?filter=clips&range=24hr' class='clips-btn' style='background: #323234;border-radius: 10px;padding: 0px 6px;display: inline-block;margin-left: 5px;color: #dedee3;'>Clips</a>");
            }
        },
        mouseleave: function () {
            clearTimeout(hovertimer);
            jQuery(this).find(".tw-aspect iframe").remove();
            jQuery(this).find(".tw-aspect #preview-overlay-div").remove();
            jQuery(this).find(".tw-aspect img").show();
        }
    }, ".tw-hover-accent-effect");

    // channel page
    jQuery(document).on({
        mouseenter: function () {
            if(!jQuery(this).find("a.clips-btn").length){
                var streamusernameurl = jQuery(this).find("a.tw-halo").attr("href");
                jQuery(this).find("a.tw-halo").after("<a href='"+streamusernameurl+"/clips?filter=clips&range=24hr' class='clips-btn' style='background: #323234;border-radius: 10px;padding: 0px 6px;display: inline-block;margin: 15px;color: #dedee3;'>Clips</a>");
            }
        }
    }, ".channel-info-content");



})();
