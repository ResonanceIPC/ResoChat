'Defining static codes
empty_code = "(:~empty~:)"
error_code = "(:~error~:)"
success_code = "(:~success~:)"
fetch_error_code = "(:~fetcherror~:)"

' Defining variables for using room
Dim url
Dim seed
Dim password

' Function which will format parameter for using in url
Function ReplaceSpecialCharacters(parameter)
    parameter = Replace(parameter, "%", "%25")
    parameter = Replace(parameter, " ", "%20")
    parameter = Replace(parameter, "/", "%2F")
    parameter = Replace(parameter, "?", "%3F")
    parameter = Replace(parameter, "&", "%26")
    parameter = Replace(parameter, "#", "%23")
    ReplaceSpecialCharacters = parameter
End Function

' Function for getting url data
Function geturlhtml(url)
    On Error Resume Next
    Dim objHTTP
    Set objHTTP = CreateObject("MSXML2.XMLHTTP")
    objHTTP.Open "GET", url, False
    objHTTP.send
    If Err.Number <> 0 Then ' Error occurred
        geturlhtml = fetch_error_code
    ElseIf objHTTP.Status = 200 Then ' Successful response
        geturlhtml = objHTTP.responseText
    Else
        geturlhtml = ""
    End If
    Set objHTTP = Nothing
    On Error GoTo 0
End Function

' Function for setupping room for accessing it
sub setup_room(server_url, room_seed, room_password)
    
    ' Setupping parameters
    url = server_url
    seed = room_seed
    password = room_password

end sub

' Function for updating room 
sub update_room(server_url, room_seed, room_password)
    
    ' Setupping parameters
    url = server_url
    seed = room_seed
    password = room_password

end sub

' Function for pinging server 
function ping_server()
    
    ' Defining route
    Dim route
    route = "/test/ping"

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = "2419" Then
        feedback = True
    Else
        feedback = False
    End If

    ' Returning feedback
    ping_server = feedback

end function

' Function for chekcing if room exists 
function room_exists()
    
    ' Defining route
    Dim route
    route = "/urlbased/exists/" & seed & "/" & password

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    ElseIf content = "true" Then
        feedback = True
    ElseIf content = "false" Then
        feedback = False
    Else
        feedback = content
    End If

    ' Returning feedback
    room_exists = feedback

end function

' Function for creating room with not necessary arguments (name, description) 
function create_room( name, description)
    
    ' Formatting parameters for parsing to url
    name = ReplaceSpecialCharacters(name)
    description = ReplaceSpecialCharacters(description)

    ' Defining route
    Dim route
    route = "/urlbased/create/" & seed & "/" & password

    ' Adding parameters to url
    If name <> "" Then
        route = route & "/" & name
        if description <> "" Then
            route = route & "/" & description
        end if
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    ElseIf content = "true" Then
        feedback = True
    ElseIf content = "false" Then
        feedback = False
    Else
        feedback = content
    End If

    ' Returning feedback
    create_room = feedback

end function

' Function for enabling room 
function enable_room()

    ' Defining route
    Dim route
    route = "/urlbased/enable/" & seed & "/" & password

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    enable = feedback

end function

' Function for disabling room 
function disable_room()

    ' Defining route
    Dim route
    route = "/urlbased/disable/" & seed & "/" & password

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    disable = feedback

end function

' Function for destroying room 
function destroy_room()

    ' Defining route
    Dim route
    route = "/urlbased/destroy/" & seed & "/" & password

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    destroy_room = feedback

end function

' Function for changing room name 
function change_room_name(name)

    ' Formatting parameters for parsing to url
    name = ReplaceSpecialCharacters(name)

    ' Defining route
    Dim route
    route = "/urlbased/change_name/" & seed & "/" & password

    ' Adding parameters to url
    If name <> "" Then
        route = route & "/" & name
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    change_room_name = feedback

end function

' Function for changing room description 
function change_room_description(description)

    ' Formatting parameters for parsing to url
    description = ReplaceSpecialCharacters(description)

    ' Defining route
    Dim route
    route = "/urlbased/change_description/" & seed & "/" & password

    ' Adding parameters to url
    If description <> "" Then
        route = route & "/" & description
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    change_room_description = feedback

end function

' Function for updating room data 
function update_room_data( name, description)
    
    ' Formatting parameters for parsing to url
    name = ReplaceSpecialCharacters(name)
    description = ReplaceSpecialCharacters(description)

    ' Defining route
    Dim route
    route = "/urlbased/update_data/" & seed & "/" & password

    ' Adding parameters to url
    If name <> "" Then
        route = route & "/" & name
        if description <> "" Then
            route = route & "/" & description
        end if
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    ElseIf content = "true" Then
        feedback = True
    ElseIf content = "false" Then
        feedback = False
    Else
        feedback = content
    End If

    ' Returning feedback
    update_room_data = feedback

end function

' Function for changing room seed 
function change_room_seed(new_seed)

    ' Defining route
    Dim route
    route = "/urlbased/change_seed/" & seed & "/" & password

    ' Adding parameters to url
    If new_seed <> "" Then
        route = route & "/" & new_seed
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If
    
    ' Updating crucial variables
    If feedback = success_code Then
        seed = new_seed
    End If

    ' Returning feedback
    change_room_seed = feedback

end function

' Function for changing room password 
function change_room_password(new_password)

    ' Defining route
    Dim route
    route = "/urlbased/change_password/" & seed & "/" & password

    ' Adding parameters to url
    If new_password <> "" Then
        route = route & "/" & new_password
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If
    
    ' Updating crucial variables
    If feedback = success_code Then
        password = new_password
    End If

    ' Returning feedback
    change_room_password = feedback

end function

' Function for setupping nickname 
function setup_nickname_in_room(nickname)

    ' Defining route
    Dim route
    route = "/urlbased/setup_nickname/" & seed & "/" & password

    ' Adding parameters to url
    If nickname <> "" Then
        route = route & "/" & nickname
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    setup_nickname_in_room = feedback

end function

' Function for marking next as read for nickname 
function mark_next_as_read_in_room(nickname)
    
    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)

    ' Defining route
    Dim route
    route = "/urlbased/mark_next_as_read/" & seed & "/" & password

    ' Adding parameters to url
    If nickname <> "" Then
        route = route & "/" & nickname
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feedback
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    mark_next_as_read_in_room = feedback

end function

' Function for marking all as read for nickname 
function mark_all_as_read_in_room(nickname)
    
    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)
    
    ' Defining route
    Dim route
    route = "/urlbased/mark_all_as_read/" & seed & "/" & password

    ' Adding parameters to url
    If nickname <> "" Then
        route = route & "/" & nickname
    end if

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    mark_all_as_read_in_room = feedback

end function

' Function for clearing all nicknames in room 
function clear_nicknames_in_room()
    
    ' Defining route
    Dim route
    route = "/urlbased/clear_nicknames/" & seed & "/" & password

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    clear_nicknames_in_room = feedback

end function

' Function for clearing all messages in room 
function clear_messages_in_room()
    
    ' Defining route
    Dim route
    route = "/urlbased/clear_messages/" & seed & "/" & password

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    clear_messages_in_room = feedback

end function

' Function for sending message 
function send_message_in_room(nickname, message, mark_read)
    
    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)
    message = ReplaceSpecialCharacters(message)

    ' Formatting mark_read parameter to right way
    mark_read_formatted = "true"
    if mark_read = False Then mark_read_formatted = "false" End If 

    ' Defining route
    Dim route
    route = "/urlbased/send_message/" & seed & "/" & password & "/" & nickname & "/" & message & "/" & mark_read_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If
    ' Returning feedback
    send_message_in_room = feedback

end function

' Function for getting room data 
function get_room_data()

    ' Defining route
    Dim route
    route = "/urlbased/get_room_data/" & seed & "/" & password

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    get_room_data = feedback

end function

' Function for getting all messages in room 
function get_all_messages_in_room(only_message)

    ' Formatting only_message parameter to right way
    only_message_formatted = "false"
    if only_message = True Then only_message_formatted = "true" End If 

    ' Defining route
    Dim route
    route = "/urlbased/get_all_messages/" & seed & "/" & password & "/" & only_message_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    get_all_messages_in_room = feedback

end function

' Function for getting last n messages in room 
function get_last_n_messages_in_room(n, only_message)

    ' Formatting only_message parameter to right way
    only_message_formatted = "false"
    if only_message = True Then only_message_formatted = "true" End If 

    ' Defining route
    Dim route
    route = "/urlbased/get_last_n_messages/" & seed & "/" & password & "/" & n & "/" & only_message_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    get_last_n_messages_in_room = feedback

end function

' Function for reading first unread message in room 
function read_first_unread_message_in_room(nickname, only_message, mark_read)

    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)

    ' Formatting only_message parameter to right way
    mark_read_formatted = "true"
    only_message_formatted = "false"
    if mark_read = False Then mark_read_formatted = "false" End If 
    if only_message = True Then only_message_formatted = "true" End If 

    ' Defining route
    Dim route
    route = "/urlbased/read_first_unread_message/" & seed & "/" & password & "/" & nickname & "/" & only_message_formatted & "/" & mark_read_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    read_first_unread_message_in_room = feedback

end function

' Function for reading last unread message in room 
function read_last_unread_message_in_room(nickname, only_message, mark_read)

    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)

    ' Formatting only_message parameter to right way
    mark_read_formatted = "true"
    only_message_formatted = "false"
    if mark_read = False Then mark_read_formatted = "false" End If 
    if only_message = True Then only_message_formatted = "true" End If 

    ' Defining route
    Dim route
    route = "/urlbased/read_last_unread_message/" & seed & "/" & password & "/" & nickname & "/" & only_message_formatted & "/" & mark_read_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    read_last_unread_message_in_room = feedback

end function

' Function for reading all unread messages in room 
function read_all_unread_messages_in_room(nickname, only_message, mark_read)

    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)

    ' Formatting only_message parameter to right way
    mark_read_formatted = "true"
    only_message_formatted = "false"
    if mark_read = False Then mark_read_formatted = "false" End If 
    if only_message = True Then only_message_formatted = "true" End If 

    ' Defining route
    Dim route
    route = "/urlbased/read_all_unread_messages/" & seed & "/" & password & "/" & nickname & "/" & only_message_formatted & "/" & mark_read_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    read_all_unread_messages_in_room = feedback

end function

' Function for reading first unread message from nickname in room 
function read_first_unread_message_from_nickname_in_room(nickname, searching_nickname, only_message, mark_read)

    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)
    searching_nickname = ReplaceSpecialCharacters(searching_nickname)

    ' Formatting only_message parameter to right way
    mark_read_formatted = "true"
    only_message_formatted = "false"
    if mark_read = False Then mark_read_formatted = "false" End If 
    if only_message = True Then only_message_formatted = "true" End If 

    ' Defining route
    Dim route
    route = "/urlbased/read_first_unread_message_from_nickname/" & seed & "/" & password & "/" & nickname & "/" & searching_nickname & "/" & only_message_formatted & "/" & mark_read_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    read_first_unread_message_from_nickname_in_room = feedback

end function

' Function for reading last unread message from nickname in room 
function read_last_unread_message_from_nickname_in_room(nickname, searching_nickname, only_message, mark_read)

    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)
    searching_nickname = ReplaceSpecialCharacters(searching_nickname)

    ' Formatting only_message parameter to right way
    mark_read_formatted = "true"
    only_message_formatted = "false"
    if mark_read = False Then mark_read_formatted = "false" End If 
    if only_message = True Then only_message_formatted = "true" End If 

    ' Defining route
    Dim route
    route = "/urlbased/read_last_unread_message_from_nickname/" & seed & "/" & password & "/" & nickname & "/" & searching_nickname & "/" & only_message_formatted & "/" & mark_read_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    read_last_unread_message_from_nickname_in_room = feedback

end function

' Function for reading all unread messages from nickname in room 
function read_all_unread_messages_from_nickname_in_room(nickname, searching_nickname, only_message, mark_read)

    ' Formatting parameters for parsing to url
    nickname = ReplaceSpecialCharacters(nickname)
    searching_nickname = ReplaceSpecialCharacters(searching_nickname)

    ' Formatting only_message parameter to right way
    mark_read_formatted = "true"
    only_message_formatted = "false"
    if mark_read = False Then mark_read_formatted = "false" End If 
    if only_message = True Then only_message_formatted = "true" End If 

    ' Defining route
    Dim route
    route = "/urlbased/read_all_unread_messages_from_nickname/" & seed & "/" & password & "/" & nickname & "/" & searching_nickname & "/" & only_message_formatted & "/" & mark_read_formatted

    ' Formatting full url
    Dim fullurl 
    fullurl = url & route

    ' Getting html of url
    Dim content
    content = geturlhtml(fullurl)

    ' Formatting feed   back
    Dim feedback
    If content = fetch_error_code Then
        feedback = fetch_error_code
    Else
        feedback = content
    End If

    ' Returning feedback
    read_all_unread_messages_from_nickname_in_room = feedback

end function