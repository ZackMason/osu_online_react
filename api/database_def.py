
entity_attributes_lut = {
    'quest': {
        'visible': ['name', 'description', 'experience_reward', 'item_reward', 'quest_giver'],
        'editable': ['name', 'description', 'experience_reward', 'item_reward'],
    },
    'items': {
        'visible': ['name', 'description', 'quality', 'sprite'],
        'editable': ['name', 'description', 'quality', 'sprite'],
    },
    'npc': {
        'visible':  ['name', 'description', 'faction'],
        'editable': ['name', 'description', 'faction'],
    },
    'map': {
        'visible': ['name', 'map_sprite'],
        'editable': ['name', 'map_sprite'],
    },
    'player':  {
        'visible': ['name', 'health', 'email', 'level', 'experience', 'current_map'],
        'editable': ['name', 'health', 'email', 'level', 'experience', 'current_map'],
    }
}