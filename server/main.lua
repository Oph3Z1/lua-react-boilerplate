frameworkObject = nil

Citizen.CreateThread(function()
    frameworkObject, Config.Framework = GetCore()
    while frameworkObject == nil do
        Citizen.Wait(0)
    end
end)