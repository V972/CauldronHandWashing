// Caudron washing v 1.0
// By V972
// KubeJS 1.18.2
// REQURES SUPPLEMENTARIES!
// priority 1

onEvent('block.right_click', (event) => {
    let mainHandWSoap = event.hand == 'main_hand' && event.item == 'supplementaries:soap';
    let validHand = event.hand == 'main_hand' && event.item == null || mainHandWSoap;

    let potentialFaucet = event.level.getBlock(event.block.x,event.block.y+1,event.block.z);
    let validTarget = 
        (event.block.id == 'minecraft:water_cauldron')
        || 
        (event.block.id == 'minecraft:cauldron' &&
        potentialFaucet.id == "supplementaries:faucet" &&
        potentialFaucet.properties['enabled'] == 'true' &&
        potentialFaucet.properties['has_water'] == 'true');
    
    if (validTarget && validHand) {
        event.player.swingArm(MAIN_HAND);

        for (let index = 0; index < 6 + Math.floor(Math.random() * 2); index++) {
            let x = (event.block.x + 0.5) + (Math.random() - 0.5);
            let y = event.block.y + 0.75
            let z = (event.block.z + 0.5) + (Math.random() - 0.5);
            Utils.server.runCommandSilent(`/particle supplementaries:splashing_liquid ${x} ${y} ${z} 45 133 255 255 0`);
        }

        if (mainHandWSoap) {
            for (let index = 0; index < 4 + Math.floor(Math.random() * 2); index++) {
                let x = (event.block.x + 0.25) + (Math.random() - 0.25);
                let y = event.block.y + 0.75
                let z = (event.block.z + 0.25) + (Math.random() - 0.25);
                Utils.server.runCommandSilent(`/particle supplementaries:suds ${x} ${y} ${z} 0 -2 0 0.02 0`)
            }
        }
    }
});
