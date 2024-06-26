namespace SpriteKind {
    export const object2 = SpriteKind.create()
}
function level_one () {
    game.splash("Collect all FIVE items and", "reach the exit to win!")
    info.setLife(5)
    info.player2.setLife(5)
    scene.setBackgroundColor(13)
    tiles.setTilemap(tilemap`level1`)
    Rebel = sprites.create(assets.image`Rebel - sideface right`, SpriteKind.Player)
    controller.moveSprite(Rebel, 100, 100)
    scene.cameraFollowSprite(Rebel)
    tiles.placeOnRandomTile(Rebel, assets.tile`stage`)
    info.startCountdown(45)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`exit`, function (sprite5, location5) {
    sprites.destroy(Rebel)
    info.stopCountdown()
    level_two()
    sprites.destroy(Rebel)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Key`, function (sprite2, location2) {
    tiles.setTileAt(location2, assets.tile`transparency16`)
    info.changeScoreBy(1)
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Projectile1`, Scientist, 50, 50)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Solar panel`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(1)
})
function level_two () {
    story.startCutscene(function () {
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
        tiles.setCurrentTilemap(tilemap`level3`)
        story.printCharacterText("Rebel is that you. . ? Quick help me out!")
        story.showPlayerChoices("help the boss", "or escape without him")
        if (true) {
            story.cancelCurrentCutscene()
        } else {
            game.gameOver(false)
        }
        game.splash("Help rebel and the mad scientist escape together!", "Don't forget to collect the fuel!")
        Rebel = sprites.create(assets.image`Rebel - sideface right`, SpriteKind.Player)
        scene.cameraFollowSprite(Rebel)
        Rebel.ay = 500
        controller.player1.moveSprite(Rebel)
        Scientist = sprites.create(assets.image`Mad scientist - sideface right`, SpriteKind.Player)
        Scientist.ay = 500
        controller.player2.moveSprite(Scientist)
        tiles.placeOnRandomTile(Rebel, assets.tile`stage`)
        tiles.placeOnRandomTile(Scientist, assets.tile`stage`)
    })
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    Scientist.vy = -100
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    Scientist.vy += -100
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
function Game_win () {
    story.startCutscene(function () {
        story.printCharacterText("After Rebel and the mad scientist defeated the monster turning it back into a tiny lizard")
        story.printCharacterText("They installed all the sources of renewable energy like they were supposed too.")
        story.printCharacterText("Using solar panels and sustainable biofuel they never had another incident again.")
    })
    game.setGameOverMessage(true, "Congrats you win!")
    game.gameOver(true)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Exit2`, function (sprite4, location4) {
    if (Rebel && Scientist) {
        level_three()
    }
})
function level_three () {
    music.play(music.createSong(hex`0078000408020800001c00010a006400f40164000004000000000000000000000000000500000428000000040002242a0400080002242a10001400021d2a14001800021d2a34003800012438003c00011d01001c000f05001202c102c20100040500280000006400280003140006020004210004000800021d2710001400012414001800012718001c0002202a24002800021d2403001c0001dc00690000045e0100040000000000000000000005640001040003060034003800012705001c000f0a006400f4010a0000040000000000000000000000000000000002200008000c0002222a0c001000011b1400180001201c00200002272a20002400011e06001c00010a006400f401640000040000000000000000000000000000000002080028002c00031d242a07001c00020a006400f401640000040000000000000000000000000000000003190000000400012008000c00021d2718001c0001271c002000011d08001c000e050046006603320000040a002d000000640014000132000201000206002c003000012909010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800090030003100040002060a`), music.PlaybackMode.LoopingInBackground)
    info.setLife(5)
    scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
    story.startCutscene(function () {
        story.printCharacterText("Rebel and his boss, the mad scientist have almost made it to the final exit. . .")
        story.printCharacterText("But a monster that was once just a lizard used for experiments in the lab. .")
        story.printCharacterText("Has become infect by the chemical residue left over from the fossil fuels, turning it into a monster")
        story.printCharacterText("Now your final mission is to defeat the monster and save the lab")
    })
    Monster = sprites.create(assets.image`THE MONSTER`, SpriteKind.Enemy)
    projectile2 = sprites.createProjectileFromSprite(assets.image`fireball`, Monster, 50, 50)
    tiles.setCurrentTilemap(tilemap`FINAL LEVEL`)
    game.splash("Defeat the monster and escape!")
    tiles.placeOnRandomTile(Rebel, assets.tile`stage`)
    scene.cameraFollowSprite(Rebel)
    controller.moveSprite(Rebel)
    tiles.placeOnRandomTile(Scientist, assets.tile`stage`)
    controller.moveSprite(Scientist)
    tiles.placeOnRandomTile(Monster, sprites.dungeon.floorMixed)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
info.onLifeZero(function () {
    game.setGameOverMessage(false, "The monster got you! TRY AGAIN")
    game.gameOver(false)
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    Rebel.vy = -100
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorDark2, function (sprite6, location6) {
    game.setGameOverMessage(false, "Don't hit the floor")
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Kelp fuel`, function (sprite3, location3) {
    tiles.setTileAt(location3, assets.tile`transparency16`)
    info.changeScoreBy(1)
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Released, function () {
    Rebel.vy += -100
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorMixed, function (sprite, location) {
    Game_win()
})
let projectile2: Sprite = null
let Monster: Sprite = null
let Scientist: Sprite = null
let projectile: Sprite = null
let Rebel: Sprite = null
music.play(music.createSong(assets.song`BCKGND MSC`), music.PlaybackMode.LoopingInBackground)
story.startCutscene(function () {
    scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
    story.printCharacterText("It's Rebel's first day as a lab assistant..")
    story.printCharacterText("His job was to help install solar panels and other sources of renewable energy at the lab")
    story.printCharacterText("But, there was an explosion at the lab cause by an over-use of fossil fuels, now it's your mission to help rebel and his boss escape the Lab.")
    level_one()
})
