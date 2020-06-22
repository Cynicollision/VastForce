import { Component, OnInit } from '@angular/core';


export class SelectValue {
  label: string;
  value: QueryType;
}

enum QueryType {
  'PermissionSet',
  'Profile',
  'User',
}

@Component({
  selector: 'app-query-permissions',
  templateUrl: './query-permissions.component.html',
  styleUrls: ['./query-permissions.component.scss']
})
export class QueryPermissionsComponent implements OnInit {

  constructor() { }

  selectedQueryType: QueryType = null;

  queryTypes: SelectValue[] = [
    { value: QueryType.Profile, label: 'Profile' },
    { value: QueryType.PermissionSet, label: 'Permission Set' },
    { value: QueryType.User, label: 'User' },
  ];

  ngOnInit() {
  }

}
