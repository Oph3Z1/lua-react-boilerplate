frameworkObject = nil

Citizen.CreateThread(function()
    frameworkObject, Config.Framework = GetCore()
    while not frameworkObject do
        Citizen.Wait(0)
    end
end)

RegisterCommand('ui', function()
    SendNUIMessage({
        action = 'Show',
        Language = Locales[Config.Language]
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback('CloseUI', function(data, cb)
    SetNuiFocus(false, false)
    print('Got close event!')
    cb({})
end)