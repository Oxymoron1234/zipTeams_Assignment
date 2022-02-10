import React, { Component } from 'react';
import "./jitsicss.css"
class JitsiComponent extends Component {

    domain = 'meet.jit.si';
    api = {};

    constructor(props) {
        super(props);
        this.state = {
            room: 'Zipteams-pro',
            onCall: false,
            user: {
                name: 'Ashish Kumar'
            },
            isAudioMuted: false,
            isVideoMuted: false
        }
    }

    startMeet = () => {
        const options = {
            roomName: this.state.room,
            width: '100%',
            height: 800,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.state.user.name
            }
        }
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
         await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
         await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
         await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        return this.props.history.push('/thank-you');
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events
    // executeCommand(command) {
    //     this.api.executeCommand(command);;
    //     if(command == 'hangup') {
    //         return this.props.history.push('/thank-you');
    //     }

    //     if(command == 'toggleAudio') {
    //         this.setState({ isAudioMuted: !this.state.isAudioMuted });
    //     }

    //     if(command == 'toggleVideo') {
    //         this.setState({ isVideoMuted: !this.state.isVideoMuted });
    //     }
    // }

    componentDidMount() {
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }
    addCalender(){ 
        // kindly place your clientId and api key 
        var gapi = window.gapi
        var CLIENT_ID = ""
        var API_KEY = ""
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPES = "https://www.googleapis.com/auth/calendar.events"
      
        
          gapi.load('client:auth2', () => {
            console.log('loaded client')
      
            gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
            })
      
            gapi.client.load('calendar', 'v3', () => console.log('bam!'))
      
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
              
              var event = {
                'summary': 'Awesome Event!',
                'location': 'Zipteams Noida ',
                'description': 'Follow-Up Meeting ',
                'start': {
                  'dateTime': '2022-02-11T18:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'end': {
                  'dateTime': '2022-02-11T19:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': 'lpage@example.com'},
                  {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              }
      
              var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event,
              })
      
              request.execute(event => {
                console.log(event)
                window.open(event.htmlLink)
              })
              
              /*
                  Uncomment the following block to get events
              */
              /*
              // get events
              gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
              }).then(response => {
                const events = response.result.items
                console.log('EVENTS: ', events)
              })
              */
            })
          })   
    }

    render() {
        // const { isAudioMuted, isVideoMuted } = this.state;
        return (
            <>      <div className="containt" >

                   <div id="jitsi-iframe"></div> 
                   <div>
                     <h2 className="notificationHeading" >
                         Notifications
                     </h2>
                     <h3 className="subNotificationHeading">
                            Meeting Details !
                     </h3>
                    <button className="calenderBtn" onClick={this.addCalender} >Add Calender</button> 
                    </div>

                    </div>
            </>
        );
    }
}

export default JitsiComponent;
