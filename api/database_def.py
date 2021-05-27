entity_attributes_lut = {
    'quest': {
        'visible': ['name', 'description', 'experience_reward', 'item_reward', 'quest_giver'],
        'editable': ['name', 'description', 'experience_reward', 'item_reward'],
    },
    'item': {
        'visible': ['name', 'description', 'quality', 'sprite'],
        'editable': ['name', 'description', 'quality', 'sprite'],
    },
    'npc': {
        'visible': ['name', 'description', 'faction'],
        'editable': ['name', 'description', 'faction'],
    },
    'map': {
        'visible': ['name', 'map_sprite'],
        'editable': ['name', 'map_sprite'],
    },
    'player': {
        'visible': ['name', 'health', 'email', 'level', 'experience', 'current_map'],
        'editable': ['name', 'health', 'email', 'level', 'experience', 'current_map'],
    },
    'player_active_quests': {
        'visible': ['player_id', 'quest_id'],
        'editable': ['player_id', 'quest_id'],
    },
    'player_inventory': {
        'visible': ['player_id', 'item_id'],
        'editable': ['player_id', 'item_id'],
    },
    'npc_drop_table': {
        'visible': ['npc_id', 'item_id'],
        'editable': ['npc_id', 'item_id'],
    },
    'spawned_npc': {
        'visible': ['map_id', 'npc_id'],
        'editable': ['map_id', 'npc_id'],
    },
}
