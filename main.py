@namespace
class SpriteKind:
    object2 = SpriteKind.create()
def level_one():
    global mySprite
    game.splash("Collect all FIVE items and", "reach the exit to win!")
    info.set_life(5)
    scene.set_background_color(13)
    tiles.set_tilemap(tilemap("""
        level1
    """))
    mySprite = sprites.create(assets.image("""
            Rebel - sideface right
        """),
        SpriteKind.player)
    controller.move_sprite(mySprite, 100, 100)
    scene.camera_follow_sprite(mySprite)
    tiles.place_on_random_tile(mySprite, assets.tile("""
        stage
    """))
    info.start_countdown(45)

def on_overlap_tile(sprite5, location5):
    sprites.destroy(mySprite)
    info.stop_countdown()
    level_two()
    sprites.destroy(mySprite)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        exit
    """),
    on_overlap_tile)

def on_overlap_tile2(sprite2, location2):
    tiles.set_tile_at(location2, assets.tile("""
        transparency16
    """))
    info.change_score_by(1)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Key
    """),
    on_overlap_tile2)

def on_overlap_tile3(sprite, location):
    tiles.set_tile_at(location, assets.tile("""
        transparency16
    """))
    info.change_score_by(1)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Solar panel
    """),
    on_overlap_tile3)

def level_two():
    
    def on_start_cutscene():
        global mySprite, mySprite2
        scroller.scroll_background_with_camera(scroller.CameraScrollMode.BOTH_DIRECTIONS)
        tiles.set_current_tilemap(tilemap("""
            level3
        """))
        story.print_character_text("Rebel is that you. . ? Quick help me out!")
        story.show_player_choices("help the boss", "or escape without him")
        if True:
            story.cancel_current_cutscene()
        else:
            game.game_over(False)
        game.splash("Help rebel and the mad scientist escape together!",
            "Don't forget to collect the fuel!")
        mySprite = sprites.create(assets.image("""
                Rebel - sideface right
            """),
            SpriteKind.player)
        scene.camera_follow_sprite(mySprite)
        mySprite.ay = 500
        controller.player1.move_sprite(mySprite)
        mySprite2 = sprites.create(assets.image("""
                Mad scientist - sideface right
            """),
            SpriteKind.player)
        mySprite2.ay = 500
        controller.player2.move_sprite(mySprite2)
        tiles.place_on_random_tile(mySprite, assets.tile("""
            stage
        """))
        tiles.place_on_random_tile(mySprite2, assets.tile("""
            stage
        """))
    story.start_cutscene(on_start_cutscene)
    

def on_player1_button_up_pressed():
    mySprite.vy = -100
controller.player1.on_button_event(ControllerButton.UP,
    ControllerButtonEvent.PRESSED,
    on_player1_button_up_pressed)

def on_player1_button_up_released():
    mySprite.vy += -100
controller.player1.on_button_event(ControllerButton.UP,
    ControllerButtonEvent.RELEASED,
    on_player1_button_up_released)

def on_player2_button_up_released():
    mySprite2.vy += -100
controller.player2.on_button_event(ControllerButton.UP,
    ControllerButtonEvent.RELEASED,
    on_player2_button_up_released)

def on_overlap_tile4(sprite4, location4):
    if mySprite and mySprite2:
        level_three()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Exit2
    """),
    on_overlap_tile4)

def level_three():
    global projectile, mySprite3
    
    def on_start_cutscene2():
        story.print_character_text("Rebel and his boss, the mad scientist have almost made it to the final exit. . .")
        story.print_character_text("But a monster that was once just a lizard used for experiments in the lab. .")
        story.print_character_text("Has become infect by the chemical residue left over from the fossil fuels, turning it into a monster")
        story.print_character_text("Now your final mission is to defeat the monster and save the lab")
    story.start_cutscene(on_start_cutscene2)
    
    projectile = sprites.create_projectile_from_sprite(assets.image("""
        Projectile1
    """), mySprite, 50, 50)
    mySprite3 = sprites.create(assets.image("""
        THE MONSTER
    """), SpriteKind.enemy)
    tiles.set_current_tilemap(tilemap("""
        level9
    """))
    game.splash("Defeat the monster and escape!")
    tiles.place_on_random_tile(mySprite, assets.tile("""
        stage
    """))
    controller.move_sprite(mySprite)
    tiles.place_on_random_tile(mySprite2, assets.tile("""
        stage
    """))
    controller.move_sprite(mySprite2)
    tiles.place_on_random_tile(mySprite3, sprites.dungeon.floor_mixed)

def on_player2_button_up_pressed():
    mySprite2.vy = -100
controller.player2.on_button_event(ControllerButton.UP,
    ControllerButtonEvent.PRESSED,
    on_player2_button_up_pressed)

def on_overlap_tile5(sprite6, location6):
    game.set_game_over_message(False, "Don't hit the floor")
    game.game_over(False)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.floor_dark2,
    on_overlap_tile5)

def on_overlap_tile6(sprite3, location3):
    tiles.set_tile_at(location3, assets.tile("""
        transparency16
    """))
    info.change_score_by(1)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Kelp fuel
    """),
    on_overlap_tile6)

mySprite3: Sprite = None
projectile: Sprite = None
mySprite2: Sprite = None
mySprite: Sprite = None
music.play(music.create_song(assets.song("""
        BCKGND MSC
    """)),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)

def on_start_cutscene3():
    scroller.scroll_background_with_camera(scroller.CameraScrollMode.ONLY_HORIZONTAL)
    story.print_character_text("It's Rebel's first day as a lab assistant..")
    story.print_character_text("His job was to help install solar panels and other sources of renewable energy at the lab")
    story.print_character_text("But, there was an explosion at the lab cause by an over-use of fossil fuels, now it's your mission to help rebel and his boss escape the Lab.")
    level_one()
story.start_cutscene(on_start_cutscene3)
