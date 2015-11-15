
			var app = angular.module('TagGen', ['ngAnimate']);



			app.controller('TagBuilder', function($scope) {

			$scope.resetOptions = function() {
				  $scope.deviceType = false;
				  $scope.paramsValid = false;
				  $scope.ctvSelect = false;
				  $scope.desktopSolution = false;
				  $scope.desktopImplementation = false;
				  $scope.desktopplayerSelect = false;
				  $scope.desktopadserverSelect = false;
				  $scope.desktopeasiType = false;
				  $scope.mwSolution = false;
				  $scope.mwImplementation = false;
				  $scope.mwplayerSelect = false;
				  $scope.mwadserverSelect = false;
				  $scope.mweasiType = false;
				  $scope.maSolution = false;
				  $scope.maAPI = false;
				  $scope.maMRAID = false;
				  $scope.maplayerSelect = false;
				  $scope.maadserverSelect = false;
                  $scope.platformSelect = false;
                  $scope.VPAID = false;
                  $scope.callProtocol = "http";
                  $scope.callOrigin = "clientside";
                  $scope.easiType = false;
                  $scope.param = false;
                  $scope.mraidAI = "1";
                  $scope.mraidPF = "0";
                  $scope.statePos = -1;
			}

		    stateName = {
        		desktop: "Desktop",
        		mobileweb: "Mobile Web",
        		mobileapp: "Mobile App",
        		ctv: "Connected TV",
        		ovp: "Existing Solution",
        		easi: "EASI Player",
        		direct: "Player Integration",
        		adserver: "Ad-server Integration",
        		yes: "VPAID 2.0",
        		no: "No VPAID Support",
        		instream: "In-stream",
        		incontent: "In-Content",
        		true: "MRAID",
        		'VPAID=1': "VPAID 1.0",
        		'VPAID=js': "VPAID 2.0",
        		'VPAID=0': "No VPAID Support",
        		'VPI=MP4': "No VPAID Support",
        		'VPI=WEBM': "No VPAID Support",
        		notS: "No MRAID Support",
        		AppleTV: "Apple TV"
        	};

			$scope.resetOptions();
            macrovars();
            $scope.states = new Array();

            $scope.stepBack = function() {
            	if($scope.maMRAID == 'true') {
            		$scope.platformSelect = false
            	};
            	if($scope.deviceType == 'ctv') {
            		$scope.VPAID = false
            	};
            	this[$scope.states[$scope.statePos]] = false;
            	this[$scope.states[$scope.statePos + 1]] = false;
            	this[$scope.states[$scope.statePos + 2]] = false;
            	this[$scope.states[$scope.statePos + 3]] = false;
            	this[$scope.states[$scope.statePos + 4]] = false;
				--$scope.statePos
			}

			$scope.incPos = function () {
				 $scope.statePos++;
			}

			$scope.breadcrumbs = function (step) {
				stepVal = this[step];
				if(typeof stateName[stepVal] === 'undefined'){
					return stepVal;
				} else {
					return stateName[stepVal];
				};
			}

			$scope.bcRemove = function (position) {
				staticPos = $scope.statePos - position;
				for (i = 0; i <= staticPos; i++) {
					$scope.stepBack();
				};
			}

			$scope.vpaidCheck = function () {
				if(($scope.VPAID == "VPAID=0" || $scope.VPAID == "VPI=MP4" || $scope.VPAID == "VPI=WEBM") && $scope.deviceType !== "ctv") {
					return true
				} else {
					return false
				};
			}


			$scope.logvar = function() {
				window.alert(stepVal);
			}

            $scope.macrosearch = function() {
                if ($scope.platformSelect !== false) {
                    $scope.macros = {
                        contentpageurl: this[$scope.platformSelect].contentpageurl,
                        cb: this[$scope.platformSelect].cb,
                        playerwidth: this[$scope.platformSelect].playerwidth,
                        playerheight: this[$scope.platformSelect].playerheight,
                        name: this[$scope.platformSelect].name,
                        notes: this[$scope.platformSelect].notes
                    }
                };
            }

            $scope.finalCrumb = function () {
            	if ($scope.platformSelect !== false && $scope.platformSelect !== "Brightcove" && $scope.platformSelect !== "AppleTV") {
            		return "Build your tag"
            	} else if ($scope.easiType !== false) {
            		return "Build your EASI code"
            	} else if ($scope.maSolution == "SDK" || $scope.maMRAID == "notS" || $scope.platformSelect == "AppleTV") {
            		return "Use our SDK"
            	} else if ($scope.platformSelect == "Brightcove") {
            		return "Download our plugin"
            	} else {
            		return "Please select"
            	};
            }
            
            //Ad-server and Player Macros

            function macrovars () {
                $scope.DFP = {
                contentpageurl: "%%REFERRER_URL_ESC_ESC%%",
                cb: "%%CACHEBUSTER%%",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "DFP",
                notes: "Please ensure sure you're using the latest version of Google IMA"
                };
                $scope.RMAS = {
                contentpageurl: "%%PAGE%%",
                cb: "%%REALRAND%%",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "24/7 Real Media",
                notes: false
                };
                $scope.AppNexus = {
                contentpageurl: "${REFERER_URL_ENC}",
                cb: "${CACHEBUSTER}",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "AppNexus",
                notes: false
                };
                $scope.YuMe = {
                contentpageurl: "${referrer}",
                cb: "${rand}",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "YuMe",
                notes: false
                };
                $scope.Freewheel = {
                contentpageurl: "#e{request.pageUrl}",
                cb: "#{slot.safeId}",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "Freewheel",
                notes: false
                };
                $scope.Auditude = {
                contentpageurl: "&lt;?auditude:q:page_url?&gt;",
                cb: "&lt;?auditude:rand?&gt;",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "Auditude",
                notes: false
                };
                $scope.EPOM = {
                contentpageurl: "$$REFERRER_ESC$$",
                cb: "$$RANDOM$$",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "EPOM",
                notes: false
                };
                $scope.Adspeed = {
                contentpageurl: "[referrer_url]",
                cb: "[random_number]",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "Adspeed",
                notes: false
                };
                $scope.Tremor = {
                contentpageurl: "[page.url]",
                cb: "[timestamp]",
                playerwidth: "[player.videoRegion.width]",
                playerheight: "[player.videoRegion.height]",
                name: "Adspeed",
                notes: false
                };
                $scope.OneScreen = {
                contentpageurl: "__AG_IMPR_HINT[referrer]:URL__",
                cb: "__AG_RANDOM_NUMBER__",
                playerwidth: "__AG_IMPR_HINT[playerWidth]__",
                playerheight: "__AG_IMPR_HINT[playerHeight]__",
                name: "OneScreen",
                notes: false
                };
                $scope.Vidible = {
                contentpageurl: "[URL]",
                cb: "[CACHE_BUSTER]",
                playerwidth: "[CONTAINER_WIDTH]",
                playerheight: "[CONTAINER_HEIGHT]",
                name: "Vidible",
                notes: false
                };
                $scope.BrightRoll = {
                contentpageurl: "##PAGE_URL##",
                cb: "##RANDOM_NUMBER##",
                dimension: "##DIMENSION##",
                name: "Brightroll",
                notes: false
                };
                $scope.Other = {
                contentpageurl: "REPLACE_ME",
                cb: "REPLACE_ME",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "your platform",
                notes: false
                };
                $scope.JW = {
                contentpageurl: "__page-url__",
                cb: "__random-number__",
                playerwidth: "__player-width__",
                playerheight: "__player-height__",
                name: "JW Player",
                notes: "VPAID 2.0 is only supported by JW Player version 7.1 and up."
                };
                $scope.Flowplayer = {
                contentpageurl: "__page-url__",
                cb: "__random-number__",
                playerwidth: "__player-width__",
                playerheight: "__player-height__",
                name: "FlowPlayer",
                notes: false
                };
                $scope.Kaltura = {
                contentpageurl: "{utility.referrer_url}",
                cb: "{utility.random}",
                playerwidth: "REPLACE_ME",
                playerheight: "REPLACE_ME",
                name: "Kaltura",
                notes: false
                };
                $scope.Brightcove = {
                contentpageurl: "NaN",
                cb: "NaN",
                playerwidth: "NaN",
                playerheight: "NaN",
                name: "NaN",
                notes: false
                };
                $scope.AppleTV = {
                contentpageurl: "NaN",
                cb: "NaN",
                playerwidth: "NaN",
                playerheight: "NaN",
                name: "NaN",
                notes: false
                };
            }

            // EASI Generator

            $scope.form = {};

            $scope.form.deviceType = "desktop";
            $scope.form.channel = "85394";
            $scope.form.contentContainerID = "spotxvideo";
            $scope.form.bannerContainerID = "spotxbanner";
            $scope.form.width = "450";
            $scope.form.height = "370";
            $scope.form.https = "0";

            $scope.form.mobileWidth = "300";
            $scope.form.mobileHeight = "250";

//            $scope.form.autoplay = "0";
            updateAttributes();

            $scope.$watch('form', function() {
                var attr;
                updateAttributes();
                for (attr in $scope.oShownAttrs)
                {
                    $scope.strAttributes += ' data-' + attr + '=' +
                            (typeof $scope.oShownAttrs[attr] != 'undefined' ? '"' + $scope.oShownAttrs[attr] + '"' : '""');
                }
                if ($scope.form.adUnit === "instream")
                {
                    for (attr in $scope.oInstreamAttrs)
                    {
                        if ($scope.oInstreamAttrs[attr])
                        {
                            $scope.strAttributes += ' data-' + attr + '="' + $scope.oInstreamAttrs[attr] + '"';
                        }
                    }
                }
                else if ($scope.form.adUnit === "incontent")
                {
                    for (attr in $scope.oIncontentAttrs)
                    {
                        if ($scope.oIncontentAttrs[attr])
                        {
                            $scope.strAttributes += ' data-' + attr + '="' + $scope.oIncontentAttrs[attr] + '"';
                        }
                    }
                }
                for (attr in $scope.oOtherAttrs)
                {
                    if ($scope.oOtherAttrs[attr])
                    {
                        $scope.strAttributes += ' data-' + attr + '="' + $scope.oOtherAttrs[attr] + '"';
                    }
                }
            }, true);
			

            function updateAttributes () {
                $scope.strAttributes = "";
                // If they have "responsive" selected but switch to 'instream' then change their deviceType
                if ($scope.form.adUnit == 'instream' && $scope.form.deviceType == 'responsive')
                {
                    $scope.form.deviceType = 'desktop';
                }
                // If it's not already encoded, then encode it.
                var encodedContentPageURL = $scope.form.contentPageURL;
                if (decodeURIComponent($scope.form.contentPageURL) == $scope.form.contentPageURL)
                {
                    encodedContentPageURL = encodeURIComponent($scope.form.contentPageURL);
                }

                // Attributes that are always included
                $scope.oShownAttrs = {
                    "spotx_channel_id": $scope.form.channel,
                    "spotx_ad_unit": $scope.form.adUnit,
                    "spotx_ad_done_function": "myAdDoneFunction"
                };

                // In-Stream-specific attributes which aren't necessarily included
                $scope.oInstreamAttrs = {
                    "spotx_content_width": ($scope.form.deviceType !='responsive') ? $scope.form.width : "",
                    "spotx_content_height": ($scope.form.deviceType !='responsive') ? $scope.form.height: "",
                    "spotx_content_type": $scope.form.contentType,
                    "spotx_vid_duration": $scope.form.vidDuration,
                    "spotx_vid_id": $scope.form.vidID,
                    "spotx_vid_description": $scope.form.vidDescription,
                    "spotx_vid_url": $scope.form.vidURL,
                    "spotx_vid_title": $scope.form.vidTitle,
                    "spotx_content_container_id": $scope.form.contentContainerID,
                    "spotx_banner_container_id": $scope.form.bannerContainerID,
                    "spotx_ad_volume": $scope.form.adVolume,
                    "spotx_autoplay": $scope.form.autoplay
                };

                // In-Content-specific attributes which aren't necessarily included
                $scope.oIncontentAttrs = {
                    "spotx_content_width": ($scope.form.deviceType !='responsive') ? $scope.form.width : "",
                    "spotx_content_height": ($scope.form.deviceType !='responsive') ? $scope.form.height: "",
                    "spotx_collapse": $scope.form.videoEnd === "collapse" ? "1" : "",
                    "spotx_loop": $scope.form.videoEnd === "loop" ? "1" : "",
                    "spotx_ad_volume": $scope.form.adVolume,
                    "spotx_click_to_replay": $scope.form.videoEnd === "click_to_replay" ? "1" : "",
                    "spotx_unmute_on_mouse": $scope.form.deviceType == 'mobile' ? "" : $scope.form.unmuteOnMouse,
                    "spotx_ad_volume": $scope.form.deviceType == 'mobile' ? "0" : $scope.form.adVolume,
                    // Autoplay should be true for mobile incontent unless otherwise specified
                    "spotx_autoplay": (typeof $scope.form.autoplay !== 'undefined' && $scope.form.autoplay !== "") ?
                        $scope.form.autoplay :
                        ($scope.form.deviceType == 'mobile' ? "1" : "")
                };

                // Other Attributes
                $scope.oOtherAttrs = {
                    "spotx_ad_format": $scope.form.deviceType == 'mobile' ? "html5" : "",
                    "spotx_ad_max_duration": $scope.form.adMaxDuration,
                    "spotx_https": $scope.form.https,
                    "spotx_content_page_url": encodedContentPageURL
                };
            }
        });


